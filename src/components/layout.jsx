import React, { useRef, useEffect } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Layout() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const navRef = useRef();
  const showNavBar = () => {
    navRef.current.classList.toggle('responsiv_nav');
  };
  const enterShowNavBar = (e) => {
    if (e.key == 'Enter') {
      showNavBar();
    }
  };
  return (
    <div className=''>
      <div id='skip'>
        <a href='#content'>Skip to Main Content</a>
      </div>
      <header>
        <div className='header-page'>
          <div className='header-top'>
            <div className='logo'>
              <Link to='/'>
                <h4>Chani</h4>
                <h4>Architecture</h4>
              </Link>
            </div>
            <div className='burger' onClick={showNavBar} onKeyDown={enterShowNavBar}>
              <i tabIndex='0' className='fa-solid fa-bars'></i>
            </div>
            <nav ref={navRef}>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/projects'>Projects</Link>
                </li>
                <li>
                  <Link to='/order'>Order</Link>
                </li>
                <li>
                  <Link to='/contact'>Contact</Link>
                </li>
                <li>
                  <Link to='/account' className='fa-solid fa-user'></Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
      <footer>
        <div className='footer'>
          <div className='left-container'>
            <ul>
              <li>
                <a href='https://goo.gl/maps/EF35KfNT1wEsaSNWA' target='_blank' aria-label='link to our address'>
                  <i className='fa-solid fa-location-dot'></i>
                  <p>Azrieli Center</p>
                </a>
              </li>
              <li>
                <a href='tel:0533410494' target='_blank' aria-label='link to our phone number'>
                  <i className='fa-solid fa-phone'></i>
                  <p>053-3410494</p>
                </a>
              </li>
              <li>
                <a href='https://wa.me/972533410494' target='_blank' aria-label='link to our whatsapp'>
                  <i className='fa-brands fa-whatsapp'></i>
                  <p>whatsapp</p>
                </a>
              </li>
              <li>
                <a href='mailto:chanimoshe01@gmail.com' target='_blank' aria-label='link to our email'>
                  <i className='fa-solid fa-envelope'></i>
                  <p>chanim@gmail.com</p>
                </a>
              </li>
              <li>
                <a href='https://www.instagram.com/chani_moshe/' target='_blank' aria-label='link to our instagram'>
                  <i className='fa-brands fa-instagram'></i>
                  <p>instagram</p>
                </a>
              </li>
              <li>
                <a
                  href='https://he-il.facebook.com/people/%D7%97%D7%A0%D7%99-%D7%91%D7%9F-%D7%A9%D7%9E%D7%A2%D7%95%D7%9F/100055724472432/'
                  target='_blank'
                  aria-label='link to our facebook'
                >
                  <i className='fa-brands fa-facebook'></i>
                  <p>facebook</p>
                </a>
              </li>
            </ul>
          </div>
          <div className='right-container'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/logIn'>Log in</Link>
              </li>
              <li>
                <Link to='/order'>Order</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
