import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRouters.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import viewRouter from './routes/viewRoutes.js';
import appError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        'ws://localhost:*',
        'http://127.0.0.1:3000',
        'http://localhost:3000',
      ],
    },
  }),
);

// Middleware
//server static files - middleware
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(`./public`));

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiter
const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});

app.use('/api', limit);

// Body parser, reading data from body into req,body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // to get the data from form to server

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/', viewRouter);
app.use(`/api/v1/tours`, tourRouter);
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/reviews`, reviewRouter);

// app.use(function (req, res, next) {
//   // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
//   // err.statusCode = 404;
//   // err.status = "Resource not found"

//   next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(function (req, res, next) {
  if (req.originalUrl.startsWith('/.well-known/')) return next(); // skip
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Central Error Handling middleware
app.use(globalErrorHandler);

export default app;
