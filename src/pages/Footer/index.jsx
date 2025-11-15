import React from "react";
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.svg';
import telegram from '../../assets/telegram.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';
import appStore from '../../assets/appStore.svg';
import playMarket from '../../assets/playMarket.svg';
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 px-15 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
  
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
          
       
          <div className="flex-shrink-0">
            <img src={logo} alt="footer-logo" className="w-24 h-auto" />
          </div>

        
          <ul className="flex flex-wrap gap-6 lg:gap-8 text-sm lg:text-base text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">
              {t('footer.about_site')}
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">
              {t('footer.RSS')}
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">
              {t('footer.contact')}
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">
              {t('footer.advertising')}
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors font-medium">
              {t('footer.team')}
            </li>
          </ul>

       
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm">
              <img src={telegram} alt="telegram" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm">
              <img src={facebook} alt="facebook" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm">
              <img src={twitter} alt="twitter" className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm">
              <img src={instagram} alt="instagram" className="w-5 h-5" />
            </a>
          </div>

      
          <div className="flex gap-3">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src={appStore} alt="apple-store" className="h-10" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src={playMarket} alt="play-market" className="h-10" />
            </a>
          </div>
        </div>

    
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-6">

          <p className="flex items-start">
            <span className="mr-2">Ⓣ</span>
            <span>{t('footer.rights')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
