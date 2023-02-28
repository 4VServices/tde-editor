import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from 'contexts/UserContext';
import { UnAuthedRoute } from 'routes/UnAuthedRoute';
import { AuthedRoute } from 'routes/AuthedRoute';
import './style.css';

const LoginPage = lazy(() => import('pages/login/index'));
const EditorPage = lazy(() => import('pages/editor/index'));

function App() {
  return (
    <UserProvider>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={<AuthedRoute />}>
            <Route path="/" element={<EditorPage />} />
          </Route>
          <Route path="/" element={<UnAuthedRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Suspense>
    </UserProvider>
  );
}

export default App;
