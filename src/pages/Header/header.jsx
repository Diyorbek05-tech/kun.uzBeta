import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [bannerVisible, setBannerVisible] = useState(true);

    const changeLanguage = (event) => {
        const newLang = event.target.value;
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    return (
        <div>
            {bannerVisible && (
                <div className="mx-15 relative">
                    <NavLink
                        to="https://kia.uz/special-offers/catch-the-hottest-offer-this-fall?utm_source=kun_uz&utm_medium=cpm&utm_campaign=kia_sportage_rassrochka_3_goda_uz_kun_uz&utm_content=sportage_rassrochka_3_goda"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://avatars.mds.yandex.net/get-adfox-content/2788782/251110_adfox_1749280_15471432.a387c0592472b310390c0d3c9474a78e.jpg/optimize.webp"
                            alt="KIA reklama banneri"
                            className="rounded-lg hover:opacity-90 transition"
                        />
                    </NavLink>

                    <button
                        className="absolute bg-white rounded-full w-8 h-8 flex items-center justify-center top-4 right-15 hover:bg-gray-100 transition-colors shadow-md z-10"
                        onClick={() => setBannerVisible(false)}
                        aria-label="Close banner"
                    >
                        <i className="fa-solid fa-x text-gray-600"></i>
                    </button>
                </div>
            )}

            <nav className='bg-white flex flex-col lg:flex-row items-center justify-between my-4 p-4 mx-15 rounded-lg shadow-sm border border-gray-200'>
                <NavLink to="/">
                    <img src={logo} alt="Logo" className="mb-4 lg:mb-0 cursor-pointer" />
                </NavLink>
                <div className='flex flex-wrap justify-center gap-4 lg:gap-6 mb-4 lg:mb-0'>
                    <NavLink to="/" className="hover:text-blue-600 font-bold transition-colors">
                        {t('header.uzb')}
                    </NavLink>
                    <NavLink to="/" className="hover:text-blue-600 font-bold transition-colors">
                        {t('header.world')}
                    </NavLink>
                    <NavLink to="/" className="hover:text-blue-600 font-bold transition-colors">
                        {t('header.economy')}
                    </NavLink>
                    <NavLink to="/" className="hover:text-blue-600 font-bold transition-colors">
                        {t('header.society')}
                    </NavLink>
                    <NavLink to="/" className="hover:text-blue-600 font-bold transition-colors">
                        {t('header.sports')}
                    </NavLink>
                    <NavLink to="/" className="hover:text-blue-600 font-bold transition-colors">
                        {t('header.technology')}
                    </NavLink>
                    <NavLink to="/" className="hover:text-blue-600 font-bold transition-colors">
                        {t('header.audio')}
                    </NavLink>
                    <NavLink to="/saved" className="hover:text-blue-600 flex items-center gap-1 font-bold transition-colors">
                    <i className="fa-solid fa-bookmark"></i>{t('header.saved')}
                    </NavLink>
                </div>
                <select
                    className="bg-transparent border border-gray-300 rounded px-3 py-1 outline-none cursor-pointer hover:border-blue-500 transition-colors focus:border-blue-600"
                    onChange={changeLanguage}
                    value={i18n.language}
                >
                    <option value="uz">O'zbekcha</option>
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                </select>
            </nav>
            
        </div>
    );
};

export default Header;
