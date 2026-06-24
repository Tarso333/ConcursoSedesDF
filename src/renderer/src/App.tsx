import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { CadernoErros } from './routes/CadernoErros'
import { Configuracoes } from './routes/Configuracoes'
import { Dashboard } from './routes/Dashboard'
import { Estatisticas } from './routes/Estatisticas'
import { Flashcards } from './routes/Flashcards'
import { Metas } from './routes/Metas'
import { ModoAprovacao } from './routes/ModoAprovacao'
import { Planejamento } from './routes/Planejamento'
import { Questoes } from './routes/Questoes'
import { Revisao } from './routes/Revisao'
import { Simulados } from './routes/Simulados'
import { TutorIA } from './routes/TutorIA'

export default function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/questoes" element={<Questoes />} />
          <Route path="/simulados" element={<Simulados />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/revisao" element={<Revisao />} />
          <Route path="/erros" element={<CadernoErros />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/planejamento" element={<Planejamento />} />
          <Route path="/metas" element={<Metas />} />
          <Route path="/aprovacao" element={<ModoAprovacao />} />
          <Route path="/tutor" element={<TutorIA />} />
          <Route path="/config" element={<Configuracoes />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
