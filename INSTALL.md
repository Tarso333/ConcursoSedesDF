# Instalação — APROVA SEDES DF

Duas formas de usar o app. Escolha conforme o objetivo.

---

## A) Só quero usar o app (usuário final)

Não precisa de Node, Git nem compilador.

1. Pegue o instalador em [`installer/`](./installer/) — ele já vem versionado no repositório, pronto para uso. (Quem gerar um novo com `npm run build` o encontra em `release/<versão>/`; essa pasta é build intermediário e não é versionada.)
2. Execute e siga o assistente — dá para escolher a pasta de instalação; ele cria o atalho **APROVA SEDES DF**.
3. A instalação é por usuário (`perMachine: false`), então **não pede administrador**.

> O instalador não é assinado digitalmente. O SmartScreen vai mostrar "O Windows protegeu o computador" → **Mais informações** → **Executar assim mesmo**.

Os dados ficam em SQLite no diretório do usuário (`app.getPath('userData')`). Nada sai da máquina.

---

## B) Quero rodar o código (desenvolvimento)

### 1. Node.js — use a versão 20 LTS

O projeto fixa `20.18.0` no [`.nvmrc`](./.nvmrc). **Não é preferência, é requisito prático**: o `better-sqlite3` é módulo nativo e só publica binários pré-compilados para as ABIs do Node 18, 20, 22 e 23. No **Node 24 não existe binário**, então o npm tenta compilar do zero — o que exige Visual Studio Build Tools (~7 GB).

```powershell
winget install CoreyButler.NVMforWindows
nvm install 20.18.0
nvm use 20.18.0
node -v      # deve responder v20.18.0
```

### 2. Instalar dependências

```powershell
git clone <url-do-repo> ConcursoSedesDF
cd ConcursoSedesDF
npm install
```

O `postinstall` roda `electron-rebuild -f -w better-sqlite3` sozinho, que **baixa** o binário já compilado para a ABI do Electron 31 (`electron-v125`) — não compila nada. Demora alguns minutos porque puxa o Electron (~170 MB).

### 3. Rodar

```powershell
npm run dev       # desenvolvimento, com HMR  ← o comando do dia a dia
```

Para rodar a versão de produção são **dois** comandos, porque `start` apenas executa um build existente:

```powershell
npm run compile   # gera out/main/index.js
npm run start
```

### 4. Outros comandos

```powershell
npm test          # 84 testes das engines puras
npm run typecheck # tsc estrito (node + web)
npm run build:dir # empacota em release/<versão>/win-unpacked/ (exe portátil)
npm run build     # gera o instalador NSIS em release/<versão>/
```

---

## Se você está preso no Node 24 (sem poder trocar de versão)

Funciona, mas o `npm install` padrão quebra. A saída é impedir que o npm compile o `better-sqlite3` para o runtime do Node — o app só precisa da build para o Electron:

```powershell
npm install --ignore-scripts               # instala sem rodar os scripts nativos
node node_modules/electron/install.js      # baixa o binário do Electron (o --ignore-scripts pulou isso)
npx electron-rebuild -f -w better-sqlite3  # baixa o .node pré-compilado da ABI do Electron
```

Depois disso `npm run dev` funciona normalmente. **Não precisa de Visual Studio Build Tools.**

---

## O contorno do winCodeSign (já automatizado)

Vale entender, porque é o erro mais obscuro do projeto.

O `npm run build` baixa o pacote `winCodeSign-2.6.0.7z`, que contém `libcrypto.dylib` e `libssl.dylib` como **symlinks de macOS**. Criar symlink no Windows exige Modo Desenvolvedor ou terminal como administrador; sem isso o `7za` aborta, e o electron-builder apaga o cache pela metade e desiste — mesmo que nada de `darwin/` seja usado num build Windows (só interessam o `rcedit` e o `signtool`).

O script [`scripts/fix-wincodesign.cjs`](./scripts/fix-wincodesign.cjs) resolve: baixa o pacote e extrai com o `tar` do Windows pulando `darwin/`, direto no diretório final que o `app-builder` procura (`%LOCALAPPDATA%\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0`). Achando o cache pronto, o electron-builder nem tenta baixar.

Ele roda **automaticamente** nos hooks `prebuild` e `prebuild:dir`, então `npm run build` funciona sem privilégio elevado. Para rodar avulso:

```powershell
npm run fix:wincodesign
```

Alternativas manuais, se preferir: ligar o **Modo Desenvolvedor** (Configurações → Privacidade e segurança → Para desenvolvedores) ou rodar o terminal **como administrador**.

---

## Problemas conhecidos

| Sintoma | Causa | Solução |
|---|---|---|
| `Missing script: "star"` | erro de digitação | o script é `start` — mas para desenvolver use `dev` |
| `'electron-vite' não é reconhecido` | `node_modules` ausente | rode `npm install` antes |
| `Cannot find module './out/main/index.js'` | `start` sem build prévio | `npm run compile` antes do `start` |
| `No prebuilt binaries found (target=24.x runtime=node)` | Node 24 | use Node 20 LTS, ou a receita da seção acima |
| `Could not find any Visual Studio installation` | consequência do erro acima | idem — não instale o VS, corrija a versão do Node |
| `NODE_MODULE_VERSION mismatch` ao abrir o app | binário compilado para Node, não para Electron | `npm run rebuild` |
| `Cannot create symbolic link` no `npm run build` | symlinks de macOS no `winCodeSign` | `npm run fix:wincodesign` (já roda sozinho no `prebuild`) |

## Requisitos que o projeto **não** tem

Vale registrar, porque economiza tempo: **não é necessário** Visual Studio Build Tools, Python, SDK do Windows nem privilégio de administrador. Todo módulo nativo é resolvido por binário pré-compilado, desde que a versão do Node esteja correta.
