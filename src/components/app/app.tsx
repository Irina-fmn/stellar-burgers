import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import styles from './app.module.css';
import '../../index.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { Preloader } from '@ui';
import {
  Routes,
  Route,
  useLocation,
  useParams,
  Location
} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  selectErrors,
  selectIngredients,
  selectLoading
} from '../../services/slices/ingredients-slice';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/user-slice';
import { useHandleModalClose } from '../../services/hooks';

const App = () => {
  const isIngredientsLoading = useSelector(selectLoading);
  const ingredients = useSelector(selectIngredients);
  const error = useSelector(selectErrors);
  const isUserLoading = useSelector((state) => state.user.loading);

  const location = useLocation() as Location<null | { background?: Location }>;
  const background = location.state?.background;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleModalClose = useHandleModalClose();

  return (
    <div className={styles.app}>
      {isUserLoading ? (
        <Preloader />
      ) : (
        <>
          <AppHeader />
          <Routes location={background || location}>
            <Route
              path='/'
              element={
                isIngredientsLoading ? (
                  <Preloader />
                ) : error ? (
                  <div
                    className={`${styles.error} text text_type_main-medium pt-4`}
                  >
                    {error}
                  </div>
                ) : ingredients.length > 0 ? (
                  <ConstructorPage />
                ) : (
                  <div
                    className={`${styles.title} text text_type_main-medium pt-4`}
                  >
                    Нет игредиентов
                  </div>
                )
              }
            />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/login'
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute requireAuth>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute requireAuth>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <div className={styles.detailPageWrap}>
                  <OrderInfo />
                </div>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <div className={styles.detailPageWrap}>
                  <h3
                    className={`${styles.detailHeader} text text_type_main-large`}
                  >
                    Детали ингредиента
                  </h3>
                  <IngredientDetails />
                </div>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute requireAuth>
                  <OrderInfo needModal />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
          {/* //модалки с дополнительной информацией */}
          {background && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <ProtectedRoute requireAuth>
                    <OrderInfo needModal />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute requireAuth>
                    <OrderInfo />
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
