// ========== COMPONENTS ========== \\
import Home  from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Reservation from "../pages/Reservation";


// ========== ROUTES ========== \\
// ::::: Does not require authentication ::::: \\
export const nonAuthRoutes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/signup',
    component: SignUp
  }
]

// Routes
export const authRoutes = [
  {
    path: '/home',
    component: Reservation
  },
];

