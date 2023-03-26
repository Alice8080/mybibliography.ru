import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Spinner from "./spinner/Spinner";
import { useGetSourcesQuery } from "../api/apiSlice";
const Source = lazy(() => import('../pages/source/Source'));
const Search = lazy(() => import('../pages/search/Search'));
const Account = lazy(() => import('../pages/account/Account'));
const List = lazy(() => import('../pages/list/List'));
const Error404 = lazy(() => import('../pages/error404/Error404'));
const Home = lazy(() => import('../pages/home/Home'));
const SourceTypes = lazy(() => import('../pages/sourceTypes/SourceTypes'));
const Order = lazy(() => import('../pages/order/Order'));
const About = lazy(() => import('../pages/about/About'));
const Contacts = lazy(() => import('../pages/contacts/Contacts'));
const LegalInfo = lazy(() => import('../pages/legalInfo/LegalInfo'));
const helmetContext = {};

const App = () => {
  const {
    data: sources = [],
  } = useGetSourcesQuery();
  const renderRoutes = (sources) => { // динамический рендеринг путей на основе данных с сервера 
    const sourcesList = sources.map((source, i) => <Route key={i} path={`/${source.path}`} element={<Source sourceName={source.name} />} />);
    return (
        <>
            <Route path='/tip-dokumenta' element={<SourceTypes sourcesList={sources} />} />
            {sourcesList}
        </>
    )
  };
  const sourcesRoutes = renderRoutes(sources);
  return (
    <HelmetProvider context={helmetContext}>
      <Router>
        <div className="wrapper">
          <Header />
          <main className="main">
              <div className="content">
                <Suspense fallback={<Spinner />}>
                  <Routes>
                      <Route path='/' element={<Home/>} />
                      <Route path='/spisok-literatury/' element={<List />} />
                      <Route path='/search' element={<Search />} />
                      <Route path='/account' element={<Account />} />
                      <Route path='/zakazat-spisok-literatury' element={<Order />} />
                      <Route path='/about' element={<About />} /> 
                      <Route path='/kontakty' element={<Contacts />} /> 
                      <Route path='/pravovaya-informaciya' element={<LegalInfo />} /> 
                      {sourcesRoutes}
                      <Route path='*' element={<Error404 />} />  
                  </Routes>
                </Suspense>
              </div>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};
export default App;