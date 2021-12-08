const router = require('express').Router();
const multer = require('multer');
const productController = require('../controllers/products');
const classesController = require('../controllers/classes');
const workshopController = require('../controllers/workshops');
const userController = require('../controllers/users');
const orderController = require('../controllers/orders');
const { verifyToken: auth } = require('../middlewares/auth');


const upload = multer({ dest: 'uploads/' })

// Products
router.get('/product', productController.getProducts);
router.post('/product', auth, upload.array('images', 3), productController.addProduct);
router.patch('/product/:id', auth, upload.array('new_images', 3), productController.updateProduct);
router.delete('/product/:id', auth, productController.deleteProduct);

// classes
router.get('/class', classesController.getClasses);
router.post('/one-class', classesController.getClass);
router.post('/class', auth, classesController.addClasses);
router.patch('/class/:id', auth, classesController.updateClasses);
router.delete('/class/:id', auth, classesController.deleteClasses);

// workshops
router.get('/workshop', workshopController.getWorkshops);
router.post('/workshop', auth, upload.array('images', 3), workshopController.addWorkshop);
router.patch('/workshop/:id', auth, workshopController.updateWorkshop);
router.delete('/workshop/:id', auth, workshopController.deleteWorkshop);

// auth
router.post('/signup', userController.createUser);
router.post('/login', userController.login);

// shop 
router.post('/shop-products', productController.getShopProducts);


// Orders
router.post('/create-order', orderController.createOrder);
router.post('/verfiy-signature', orderController.verifySignature);
router.post('/complete-payment', orderController.completePayment);


module.exports = router;
