#!/usr/bin/env node
/**
 * Prepara o cache do winCodeSign para o electron-builder rodar sem privilégio elevado.
 *
 * O pacote winCodeSign-2.6.0.7z carrega libcrypto.dylib e libssl.dylib como symlinks de
 * macOS. O 7za que o electron-builder usa aborta ao extraí-los ("Cannot create symbolic
 * link"), porque criar symlink no Windows exige Modo Desenvolvedor ou terminal como
 * administrador — e o electron-builder apaga o cache pela metade e desiste. O detalhe é
 * que num build Windows nada de darwin/ é usado: só precisamos de rcedit e signtool.
 *
 * Então extraímos nós mesmos, pulando darwin/, direto no diretório final que o
 * app-builder procura. Encontrando o cache pronto, ele nem tenta baixar.
 *
 * Idempotente e no-op fora do Windows. Usa apenas builtins do Node + o tar do Windows.
 */
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const VERSION = '2.6.0'
const URL = `https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-${VERSION}/winCodeSign-${VERSION}.7z`

if (process.platform !== 'win32') process.exit(0)

const cacheDir = path.join(
  process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'),
  'electron-builder',
  'Cache',
  'winCodeSign'
)
// O nome do diretório vem do app-builder: `download-artifact --name winCodeSign`
// resolve para <cache>/winCodeSign/winCodeSign-<versão>.
const target = path.join(cacheDir, `winCodeSign-${VERSION}`)
const sentinel = path.join(target, 'windows-10', 'x64', 'signtool.exe')

if (fs.existsSync(sentinel)) {
  console.log(`winCodeSign: cache já pronto em ${target}`)
  process.exit(0)
}

const archive = path.join(os.tmpdir(), `winCodeSign-${VERSION}.7z`)

async function download() {
  console.log(`winCodeSign: baixando ${URL}`)
  const res = await fetch(URL, { redirect: 'follow' })
  if (!res.ok) throw new Error(`download falhou: HTTP ${res.status}`)
  fs.writeFileSync(archive, Buffer.from(await res.arrayBuffer()))
}

async function main() {
  await download()

  fs.rmSync(target, { recursive: true, force: true })
  fs.mkdirSync(target, { recursive: true })

  // O tar do Windows (bsdtar/libarchive) lê .7z e aceita --exclude, ao contrário do 7za.
  console.log('winCodeSign: extraindo sem a pasta darwin/')
  execFileSync('tar', ['-xf', archive, '-C', target, '--exclude', 'darwin/*', '--exclude', 'darwin'], {
    stdio: 'inherit'
  })

  if (!fs.existsSync(sentinel)) {
    throw new Error(`extração incompleta: ${sentinel} não foi criado`)
  }

  fs.rmSync(archive, { force: true })
  console.log(`winCodeSign: pronto em ${target}`)
}

main().catch((err) => {
  console.error(`winCodeSign: ${err.message}`)
  console.error('Alternativa: ligue o Modo Desenvolvedor do Windows ou rode o terminal como administrador.')
  process.exit(1)
})
