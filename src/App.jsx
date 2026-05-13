import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingCart, X, ChevronDown, AlertTriangle, Trash2, Heart, Search, ArrowRight, Zap, FileText, CheckCircle } from 'lucide-react';

// API Configuration (Loaded from .env)
const SHOP_API_KEY = import.meta.env.VITE_SHOP_API_KEY;
const RZP_KEY_ID = import.meta.env.VITE_RZP_KEY_ID;

const BillingMemo = ({ cart, orderId, total }) => (
  <div className="billing-memo" style={{ 
    background: '#fff', border: '10px solid #000', padding: '40px', 
    boxShadow: '20px 20px 0px var(--neon-green)', fontFamily: 'var(--font-body)' 
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid #000', paddingBottom: '20px', marginBottom: '20px' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '2rem' }}>UIPHORIYA</h2>
        <p>RAW INDUSTRIES / 2026</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontWeight: '800' }}>MEMO: #{orderId}</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
    </div>
    
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #000' }}>
          <th style={{ textAlign: 'left', padding: '10px 0' }}>ITEM</th>
          <th style={{ textAlign: 'right', padding: '10px 0' }}>PRICE</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, i) => (
          <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px 0', textTransform: 'uppercase', fontWeight: '800' }}>{item.title || item.name}</td>
            <td style={{ textAlign: 'right', padding: '10px 0' }}>${item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: '900', borderTop: '4px solid #000', paddingTop: '20px' }}>
      <span>TOTAL PAID</span>
      <span>${total}</span>
    </div>
    
    <div style={{ marginTop: '40px', textAlign: 'center', border: '4px dashed #000', padding: '20px' }}>
      <CheckCircle size={40} style={{ margin: '0 auto 10px' }} />
      <h3 style={{ textTransform: 'uppercase' }}>TRANSACTION VERIFIED</h3>
      <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>THANK YOU FOR FEEDING THE VOID.</p>
    </div>
  </div>
);

const Header = ({ cartCount, onSignInClick, onCartClick, onSearchChange }) => (
  <header className="brutalist-header">
    <div className="header-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h1 className="header-text clickable glitch-hover" data-text="UIPHORIYA" onClick={() => window.location.reload()}>
        UIPHORIYA
      </h1>
      <div className="header-actions">
        <div className="search-box">
          <Search size={20} style={{ marginRight: '10px' }} />
          <input 
            type="text" 
            placeholder="SEARCH THE VOID..." 
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button className="cart-btn clickable" onClick={onCartClick}>
          CART [{cartCount}]
        </button>
        <button className="signin-btn clickable" onClick={onSignInClick}>
          SIGN IN
        </button>
      </div>
    </div>
    <nav className="header-nav" style={{ display: 'flex', gap: '30px', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.9rem' }}>
      {['Shop', 'Drops', 'Archive', 'Community', 'Support'].map(link => (
        <span key={link} className="clickable nav-link" onClick={() => alert(`Navigating to ${link}...`)}>
          {link}
        </span>
      ))}
    </nav>
  </header>
);

const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted }) => (
  <div className="product-card">
    <div className="product-image-container" style={{ position: 'relative' }}>
      <div className="product-image" style={{ backgroundImage: `url(${product.image || product.img})` }}></div>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className="wishlist-btn clickable"
          style={{ background: '#fff', border: '3px solid #000', padding: '8px', borderRadius: '0' }}
        >
          <Heart size={20} fill={isWishlisted ? "#ff00ff" : "none"} color={isWishlisted ? "#ff00ff" : "black"} />
        </button>
      </div>
    </div>
    <div className="product-info">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1rem', height: '3rem', overflow: 'hidden' }}>{product.title || product.name}</h3>
        <span className="category-tag">{product.category}</span>
      </div>
      <p className="price-text">${product.price}</p>
      <button 
        className="add-to-cart-btn clickable" 
        onClick={() => addToCart(product)}
      >
        ADD TO CART <ArrowRight size={18} style={{ marginLeft: '10px' }} />
      </button>
    </div>
  </div>
);

const Sidebar = ({ filter, setFilter }) => (
  <aside className="sidebar">
    <div className="sidebar-sticky">
      <h2>FILTERS</h2>
      <div className="filter-group">
        <label>Category</label>
        <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
          <option value="All">All Items</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's</option>
          <option value="women's clothing">Women's</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Max Budget</label>
        <input 
          type="number" 
          placeholder="999.99" 
          value={filter.maxPrice} 
          onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })} 
        />
      </div>
      <button 
        className="signin-btn clickable" 
        style={{ width: '100%', background: '#000', color: '#fff', marginTop: '20px' }}
        onClick={() => setFilter({ category: 'All', maxPrice: '', search: '' })}
      >
        RESET FILTERS
      </button>
      <div className="sidebar-footer" style={{ marginTop: '40px', fontSize: '0.7rem', fontWeight: '800', opacity: 0.5 }}>
        UIPHORIYA SYSTEM v2.0.4<br/>
        STATUS: OPERATIONAL
      </div>
    </div>
  </aside>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <X size={30} className="clickable close-modal" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={onClose} />
        <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '2.5rem', marginBottom: '30px' }}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

const LoadingScreen = ({ progress }) => (
  <div className="loading-screen loading-active">
    <div className="loading-text">UIPHORIYA</div>
    <div className="loading-bar-container">
      <div className="loading-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
    <div className="loading-status">INITIALIZING API... {progress}%</div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState({ category: 'All', maxPrice: '', search: '' });
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [memoData, setMemoData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          headers: { 'X-API-KEY': SHOP_API_KEY }
        });
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = filter.category === 'All' || p.category === filter.category;
      const matchPrice = filter.maxPrice === '' || p.price <= parseFloat(filter.maxPrice);
      const matchSearch = filter.search === '' || (p.title || p.name).toLowerCase().includes(filter.search.toLowerCase());
      return matchCat && matchPrice && matchSearch;
    });
  }, [products, filter]);

  const handlePayment = () => {
    const total = cart.reduce((s, i) => s + i.price, 0).toFixed(2);
    const options = {
      key: RZP_KEY_ID,
      amount: Math.round(parseFloat(total) * 100),
      currency: "USD",
      name: "UIPHORIYA MARKETPLACE",
      description: "RAW INDUSTRIES TRANSACTION",
      handler: function (response) {
        setMemoData({
          cart: [...cart],
          orderId: response.razorpay_payment_id,
          total: total
        });
        setCart([]);
        setShowCart(false);
      },
      prefill: {
        name: "RAW CUSTOMER",
        email: "void@uiphoriya.com"
      },
      theme: { color: "#00ffff" }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <LoadingScreen progress={progress} />;

  return (
    <div style={{ background: 'var(--bg-secondary)', minHeight: '100vh' }}>
      <Header 
        cartCount={cart.length} 
        onSignInClick={() => setIsSignInOpen(true)}
        onCartClick={() => setShowCart(!showCart)}
        onSearchChange={(val) => setFilter({ ...filter, search: val })}
      />
      <div className="main-layout">
        <Sidebar filter={filter} setFilter={setFilter} />
        <main style={{ paddingBottom: '100px' }}>
          <div style={{ padding: '40px', background: '#000', color: '#fff', borderBottom: 'var(--border-thick)', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.5rem', letterSpacing: '4px' }}>API_CONNECTED / {products.length} ITEMS LOADED</h2>
          </div>
          <div className="product-grid">
            {filteredProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                addToCart={(p) => { setCart([...cart, p]); setShowCart(true); }} 
                toggleWishlist={(p) => {
                  if (wishlist.find(i => i.id === p.id)) setWishlist(wishlist.filter(i => i.id !== p.id));
                  else setWishlist([...wishlist, p]);
                }}
                isWishlisted={!!wishlist.find(i => i.id === p.id)}
              />
            ))}
          </div>

          <section className="faq-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
              <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '4rem', lineHeight: 0.8 }}>SYSTEM<br/>FAQ</h2>
              <Zap size={60} color="var(--neon-green)" />
            </div>
            {[
              { q: "AUTHENTICITY?", a: "Every piece is verified by the Uiphoriya lab. No fakes in the raw era." },
              { q: "SHIPPING?", a: "3-5 days. Packaged in industrial-grade containers." },
              { q: "RETURNS?", a: "7 days. Must be in pristine, untouched condition." }
            ].map((item, i) => (
              <div key={i} className="faq-card clickable">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>{item.q}</h4>
                  <ChevronDown />
                </div>
                <p style={{ opacity: 0.6, fontWeight: '400' }}>{item.a}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
      {showCart && (
        <div className="cart-floating">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.8rem' }}>YOUR HAUL [{cart.length}]</h2>
            <X size={24} className="clickable" onClick={() => setShowCart(false)} />
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '30px', paddingRight: '10px' }}>
            {cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
                <div style={{ width: '80px', height: '80px', background: '#eee', backgroundImage: `url(${item.image || item.img})`, backgroundSize: 'cover', border: '2px solid #000' }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase' }}>{item.title || item.name}</p>
                  <p style={{ fontWeight: '400', fontSize: '0.9rem' }}>${item.price}</p>
                </div>
                <Trash2 size={20} color="red" className="clickable" onClick={() => {
                  const newCart = [...cart];
                  newCart.splice(i, 1);
                  setCart(newCart);
                }} />
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ borderTop: '4px solid #000', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem' }}>
                <span style={{ fontWeight: '800' }}>SUBTOTAL</span>
                <span style={{ fontWeight: '800' }}>${cart.reduce((s, i) => s + i.price, 0).toFixed(2)}</span>
              </div>
              <button 
                className="cart-btn clickable" 
                style={{ width: '100%', padding: '20px', background: '#000', color: '#fff', fontSize: '1.2rem' }}
                onClick={handlePayment}
              >
                PAY WITH RAZORPAY
              </button>
            </div>
          )}
        </div>
      )}
      <Modal isOpen={!!memoData} onClose={() => setMemoData(null)} title="BILLING MEMO">
        {memoData && <BillingMemo {...memoData} />}
      </Modal>
      <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} title="ACCESS DENIED">
        <p style={{ marginBottom: '30px', fontWeight: '400' }}>API KEY: {SHOP_API_KEY}</p>
        <button className="cart-btn clickable" style={{ width: '100%', background: '#000', color: '#fff', padding: '20px' }} onClick={() => setIsSignInOpen(false)}>CLOSE</button>
      </Modal>

      <footer style={{ background: '#000', color: '#fff', padding: '100px 40px', borderTop: '10px solid #000' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '80px' }}>
          <div>
            <h4 className="header-text" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>UIPHORIYA</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.4, maxWidth: '300px', lineHeight: 1.8 }}>
              EST. 2026. RAW INDUSTRIES WORLDWIDE. THE ARCHIVE IS ALWAYS OPEN. THE FUTURE IS LOUD.
            </p>
          </div>
          <div>
            <h5 style={{ fontWeight: '800', marginBottom: '30px', letterSpacing: '2px' }}>MANIFESTO</h5>
            <div style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 2 }}>
              AUTHENTICITY OVER POLISH.<br/>
              CHAOS OVER COMFORT.<br/>
              THE VOID OVER THE GRID.
            </div>
          </div>
          <div>
            <h5 style={{ fontWeight: '800', marginBottom: '30px', letterSpacing: '2px' }}>CONNECT</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.9rem' }}>
              <span className="clickable nav-link">INSTAGRAM [LOUD]</span>
              <span className="clickable nav-link">TWITTER [VOID]</span>
              <span className="clickable nav-link">DISCORD [RAW]</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
