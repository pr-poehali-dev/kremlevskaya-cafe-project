import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (name: string, priceStr: string, image: string) => {
    const price = parseInt(priceStr.replace(/[^0-9]/g, ''));
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.name === name 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { name, price, quantity: 1, image }]);
    }
  };

  const removeFromCart = (name: string) => {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item => 
        item.name === name 
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      setCart(cart.filter(item => item.name !== name));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isCartOpen]);

  const menuItems = [
    {
      category: 'Вафли',
      items: [
        { name: 'Классическая венская', description: 'Хрустящая вафля с сахарной пудрой', price: '290 ₽', image: 'https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/89ae9595-3abb-4358-af7a-7baba6ebf271.jpg' },
        { name: 'Шоколадная', description: 'С шоколадным соусом и свежими ягодами', price: '350 ₽', image: 'https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/89ae9595-3abb-4358-af7a-7baba6ebf271.jpg' },
        { name: 'Медовая с орехами', description: 'С натуральным мёдом и грецкими орехами', price: '390 ₽', image: 'https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/89ae9595-3abb-4358-af7a-7baba6ebf271.jpg' },
        { name: 'Фруктовая', description: 'С карамелизированными фруктами и сливками', price: '420 ₽', image: 'https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/89ae9595-3abb-4358-af7a-7baba6ebf271.jpg' }
      ]
    },
    {
      category: 'Чай',
      items: [
        { name: 'Черный чай', description: 'Классический Earl Grey', price: '150 ₽', image: 'https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/2149f723-d2b1-4e6c-8a57-f4964bf177fd.jpg' },
        { name: 'Зеленый чай', description: 'Сенча с жасмином', price: '180 ₽', image: 'https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/2149f723-d2b1-4e6c-8a57-f4964bf177fd.jpg' },
        { name: 'Травяной чай', description: 'Натуральный сбор с мятой и мелиссой', price: '170 ₽', image: 'https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/2149f723-d2b1-4e6c-8a57-f4964bf177fd.jpg' },
        { name: 'Фруктовый чай', description: 'Ягодный микс с гибискусом', price: '190 ₽', image: 'https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/2149f723-d2b1-4e6c-8a57-f4964bf177fd.jpg' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-accent to-secondary">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary">
              Kremlevskaya Waffles
            </h1>
            <div className="hidden md:flex gap-6">
              {['Главная', 'О нас', 'Меню', 'Доставка', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`font-medium transition-colors hover:text-primary ${
                    activeSection === item.toLowerCase().replace(' ', '-')
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-primary hover:bg-secondary/20 rounded-lg transition-colors"
                aria-label="Open cart"
              >
                <Icon name="ShoppingCart" size={24} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-primary"
                aria-label="Toggle menu"
              >
                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 right-0 left-0 bg-white shadow-lg animate-slide-in">
            <div className="flex flex-col p-6 space-y-4">
              {['Главная', 'О нас', 'Меню', 'Доставка', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`text-lg font-medium py-3 text-left transition-colors ${
                    activeSection === item.toLowerCase().replace(' ', '-')
                      ? 'text-primary font-bold'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <section
        id="главная"
        className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary to-accent text-white"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                Вкус<br />настоящих<br />вафель
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Свежеиспечённые венские вафли и ароматный чай в уютной атмосфере
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('меню')}
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  Смотреть меню
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('контакты')}
                  className="border-white text-white hover:bg-white/10"
                >
                  Контакты
                </Button>
              </div>
            </div>
            <div className="animate-fade-in">
              <img
                src="https://cdn.poehali.dev/projects/2dac5eed-fb65-4ed8-baa9-fd25d93714ca/files/6030cd24-010a-45d3-8ed9-f95a1eae2d9c.jpg"
                alt="Kremlevskaya Waffles"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="о-нас" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-primary">
            О нас
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Добро пожаловать в Kremlevskaya Waffles — место, где традиции встречаются с современностью
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Icon name="Cookie" className="text-primary" size={24} />
                </div>
                <CardTitle className="font-heading">Свежая выпечка</CardTitle>
                <CardDescription>
                  Готовим вафли каждый день по оригинальному бельгийскому рецепту
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Icon name="Coffee" className="text-primary" size={24} />
                </div>
                <CardTitle className="font-heading">Чайная карта</CardTitle>
                <CardDescription>
                  Более 15 видов премиального чая со всего мира
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Icon name="Heart" className="text-primary" size={24} />
                </div>
                <CardTitle className="font-heading">С любовью</CardTitle>
                <CardDescription>
                  Каждый гость для нас особенный, создаём уютную атмосферу
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="меню" className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-primary">
            Меню
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Наши фирменные блюда и напитки
          </p>

          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-16">
              <h3 className="text-3xl font-heading font-bold mb-8 text-primary">
                {section.category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.items.map((item, itemIdx) => (
                  <Card key={itemIdx} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="font-heading text-lg">{item.name}</CardTitle>
                      <CardDescription className="min-h-12">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{item.price}</span>
                        <Button 
                          size="sm" 
                          className="bg-accent hover:bg-accent/90"
                          onClick={() => addToCart(item.name, item.price, item.image)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="доставка" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-primary">
            Доставка
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Наслаждайтесь нашими вафлями у себя дома
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">30-40 минут</h3>
              <p className="text-muted-foreground">Среднее время доставки</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Бесплатно</h3>
              <p className="text-muted-foreground">При заказе от 1000 ₽</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MapPin" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Зона доставки</h3>
              <p className="text-muted-foreground">В пределах 5 км от кафе</p>
            </div>
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-6 text-primary">
            Контакты
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Мы всегда рады вашим вопросам и предложениям
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="MapPin" className="text-primary" size={24} />
                  <h3 className="text-xl font-heading font-bold">Адрес</h3>
                </div>
                <p className="text-muted-foreground">
                  Москва, ул. Арбат, д. 10
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Phone" className="text-primary" size={24} />
                  <h3 className="text-xl font-heading font-bold">Телефон</h3>
                </div>
                <p className="text-muted-foreground">
                  +7 (495) 123-45-67
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Clock" className="text-primary" size={24} />
                  <h3 className="text-xl font-heading font-bold">Время работы</h3>
                </div>
                <p className="text-muted-foreground">
                  Ежедневно с 9:00 до 22:00
                </p>
              </div>
            </div>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-heading">Напишите нам</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email" />
                  </div>
                  <div>
                    <Textarea placeholder="Сообщение" rows={4} />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-2">Kremlevskaya Waffles</h3>
              <p className="text-white/70">© 2024 Все права защищены</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-secondary transition-colors">
                <Icon name="Instagram" size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Icon name="Facebook" size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Icon name="Twitter" size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-full md:w-96 bg-white shadow-2xl animate-slide-in flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-primary">Корзина</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-secondary/20 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">Корзина пуста</p>
                  <p className="text-sm text-muted-foreground mt-2">Добавьте товары из меню</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.name} className="overflow-hidden">
                      <div className="flex gap-4 p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-heading font-bold text-sm mb-2">{item.name}</h3>
                          <p className="text-primary font-bold">{item.price} ₽</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(item.name)}
                              className="h-8 w-8 p-0"
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="font-bold text-lg">{item.quantity}</span>
                            <Button
                              size="sm"
                              onClick={() => addToCart(item.name, `${item.price} ₽`, item.image)}
                              className="h-8 w-8 p-0 bg-accent hover:bg-accent/90"
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-secondary/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-heading font-bold">Итого:</span>
                  <span className="text-2xl font-heading font-bold text-primary">
                    {getTotalPrice()} ₽
                  </span>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 text-lg">
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;