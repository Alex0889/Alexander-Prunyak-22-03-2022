import {FC, lazy, Suspense} from 'react';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import {useAppSelector} from './app/hooks';
import {ToastContainer} from 'react-toastify';
import Loader from "./components/Loader";
import {
  Routes,
  Route,
} from "react-router-dom";

import('dayjs/locale/ru');
import('dayjs/locale/en');

const HomePage = lazy(() => import('pages/Home'));
const FavoritesPage = lazy(() => import('pages/Favorites'));

const App: FC = () => {
  const {
    language: {lang},
  } = useAppSelector();

  dayjs.locale(lang);
  dayjs.extend(calendar);
  dayjs.extend(updateLocale);
  dayjs.updateLocale('ru', {
    weekdays:
      'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split(
        '_',
      ),
    calendar: {
      lastDay: '[Вчера]',
      sameDay: '[Сегодня]',
      nextDay: '[Завтра]',
      nextWeek: 'dddd',
      sameElse: 'dddd',
    }
  });

  return (
    <div className='App'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<Loader/>}>
            <HomePage/>
          </Suspense>
        }/>
        <Route path="/favorites" element={
          <Suspense fallback={<Loader/>}>
            <FavoritesPage/>
          </Suspense>
        }/>
        <Route path="*" element={<HomePage/>}/>
      </Routes>
    </div>
  );
};

export default App;
