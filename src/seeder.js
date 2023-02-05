require("app-module-path").addPath(__dirname);

const bcrypt = require("bcrypt");
const { database } = require("utilities");
const { User, Product, Slide } = require("models");

const users = [
  {
    firstName: "مهدی",
    lastName: "پایوند",
    email: "paivand13811831@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: true,
  },
  {
    firstName: "محمد",
    lastName: "کریمی",
    email: "mohammadkarimi@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    firstName: "رضا",
    lastName: "پایوند",
    email: "rezapayvand@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

const products = [
  {
    image: "/uploads/1.jpg",
    title: "گوشی موبایل نوکیا مدل 105 - 2019 TA-1174 DS FA دو سیم کارت ظرفیت 4 مگابایت و رم 4 مگابایت",
    price: 505e3,
    description:
      "<h1><div><p>نوکیا ۱۰۵؛ دوران سادگی نوکیا ادامه دارد!</p></div></h1><div><p>شرکت نوکیا همیشه گوشی‌های ساده باکیفیتی راهی بازار کرده است. یکی از گوشی‌های ساده جدیدی که از طرف این شرکت راهی بازار شده، نوکیا 105 نام دارد. نوکیا 105 یک تلفن همراه ساده و شیک است. گرچه کارهای پیچیده گوشی‌های هوشمند را انجام نمی‌دهد، اما آنقدر با کیفیت ساخته شده و ظاهر خوبی دارد که خیلی‌ها آن را به عنوان گوشی دوم انتخاب می‌کنند.</p></div>",
  },
  {
    image: "/uploads/2.jpg",
    title: "گوشی موبایل شیائومی مدل Poco C40 دو سیم کارت ظرفیت 64 گیگابایت و رم 4 گیگابایت- گلوبال",
    price: 8999e3,
  },
  {
    image: "/uploads/3.jpg",
    title: "گوشی موبایل شیائومی مدل Redmi Note 11 pro 4G دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 8 گیگابایت",
    price: 5335e3,
  },
  {
    image: "/uploads/4.jpg",
    title: "گوشی موبایل شیائومی مدل Redmi A1 plus دو سیم کارت ظرفیت 32 گیگابایت و رم 2 گیگابایت - گلوبال ",
    price: 4149e3,
  },
  {
    image: "/uploads/5.jpg",
    title: "گوشی موبایل هوآوی مدل nova Y70 دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت",
    price: 2819e3,
  },
  {
    image: "/uploads/6.jpg",
    title: "گوشی موبایل سامسونگ مدل GALAXY A53 5G دو سیم کارت ظرفیت 128 گیگابایت و رم 8 گیگابایت",
    price: 8599e3,
  },
  {
    image: "/uploads/7.jpg",
    title: "گوشی موبایل اپل مدل iPhone 13 CH دو سیم‌ کارت ظرفیت 128 گیگابایت و رم 4 گیگابایت",
    price: 369e5,
  },
  {
    image: "/uploads/8.jpg",
    title: "گوشی موبایل سامسونگ مدل Galaxy A53 5G دو سیم کارت ظرفیت 256 گیگابایت و رم 8 گیگابایت",
    price: 12599e3,
  },
];

const slides = [{ image: "/uploads/9.jpg" }, { image: "/uploads/10.jpg" }, { image: "/uploads/11.jpg" }];

const importData = async () => {
  await User.deleteMany();
  await Product.deleteMany();
  await Slide.deleteMany();

  await User.insertMany(users);
  await Product.insertMany(products);
  await Slide.insertMany(slides);

  console.log("Data imported.");
  process.exit(0);
};

const destroyData = async () => {
  await User.deleteMany();
  await Slide.deleteMany();

  console.log("Data Destroyed!");
  process.exit(0);
};

const handler = () => {
  if (process.argv[2] === "-d") return destroyData();

  importData();
};

Promise.resolve()
  .then(() => database.connect())
  .then(() => handler());
