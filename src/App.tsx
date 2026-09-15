import React, { useState, useEffect } from 'react';
import { ViewTab, Product, CartItem } from './types';
import { PRODUCTS, INITIAL_CART_ITEMS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MenuDrawer } from './components/MenuDrawer';
import { Toast } from './components/Toast';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AccountView } from './views/AccountView';
import { BulkOrderView } from './views/BulkOrderView';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('BULK10');
  const [gstin, setGstin] = useState<string>('07AABCA1234F1Z9');
  const [companyName, setCompanyName] = useState<string>('Apex Security Solutions Pvt. Ltd.');

  // Placed order tracking
  const [lastPlacedOrderId, setLastPlacedOrderId] = useState<string>('ORD-2024-001');
  const [lastOrderTotal, setLastOrderTotal] = useState<number>(5389);
  const [lastOrderAddress, setLastOrderAddress] = useState<any>({
    fullName: 'Col. Rajesh Malhotra',
    phone: '9876543210',
    email: 'procurement@apexsecurity.in',
    orgName: 'Apex Security Solutions Pvt. Ltd.',
    orgGstin: '07AABCA1234F1Z9',
    address1: 'Building 4B, Sector 62, Cyber City',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pinCode: '201301'
  });
  const [placedItems, setPlacedItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  // Auto scroll to top on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleNavigate = (tab: ViewTab) => {
    setCurrentTab(tab);
  };

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setCurrentTab('product-detail');
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === existing.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          qty: 1,
          size,
          color: 'Navy Blue',
          image: product.image,
          tierBadge: 'Standard'
        }
      ];
    });
  };

  const handleAddToCartWithDetails = (item: {
    productId: string;
    name: string;
    price: number;
    qty: number;
    size: string;
    color: string;
    image: string;
    tierBadge?: string;
  }) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.productId === item.productId && i.size === item.size && i.color === item.color
      );
      if (existing) {
        return prev.map(i =>
          i.id === existing.id ? { ...i, qty: i.qty + item.qty, price: item.price } : i
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          ...item
        }
      ];
    });
  };

  const handleUpdateQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart(prev => prev.map(item => (item.id === id ? { ...item, qty: newQty } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cleared all items from cart');
  };

  const handleRestoreDemoCart = () => {
    setCart(INITIAL_CART_ITEMS);
    showToast('Restored demo procurement items');
  };

  const handleOrderPlaced = (newId: string, finalTotal: number, addressDetails: any) => {
    setLastPlacedOrderId(newId);
    setLastOrderTotal(finalTotal);
    setLastOrderAddress(addressDetails);
    setPlacedItems([...cart]);
    // Clear cart after placing order
    setCart([]);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9ff] text-[#0e1d29] antialiased">
      {/* Fixed Sticky Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Side Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-lg mx-auto pt-24">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'catalog' && (
          <CatalogView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            onNavigate={handleNavigate}
            onAddToCartWithDetails={handleAddToCartWithDetails}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onRestoreDemoCart={handleRestoreDemoCart}
            onNavigate={handleNavigate}
            onShowToast={showToast}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={(code) => setAppliedCoupon(code)}
            onRemoveCoupon={() => setAppliedCoupon(null)}
            gstin={gstin}
            companyName={companyName}
            onUpdateGstInfo={(g, c) => {
              setGstin(g);
              setCompanyName(c);
            }}
          />
        )}

        {currentTab === 'checkout' && (
          <CheckoutView
            cart={cart}
            gstin={gstin}
            companyName={companyName}
            appliedCoupon={appliedCoupon}
            onNavigate={handleNavigate}
            onOrderPlaced={handleOrderPlaced}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'order-confirmation' && (
          <OrderConfirmationView
            orderId={lastPlacedOrderId}
            orderTotal={lastOrderTotal}
            addressDetails={lastOrderAddress}
            orderItems={placedItems}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'tracking' && (
          <OrderTrackingView
            orderId={lastPlacedOrderId}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'account' && (
          <AccountView
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'custom-bulk-order' && (
          <BulkOrderView
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
      />
    </div>
  );
};

export default App;
