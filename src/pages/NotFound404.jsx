import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound404() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EDEDED] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 max-w-lg w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-black text-gray-900 mb-4">
            {t('notFound.title')}
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t('notFound.heading')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('notFound.description')}
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="text-6xl">
            🔍
          </div>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home size={20} />
            {t('notFound.home_button')}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
            {t('notFound.back_button')}
          </button>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>💡 {t('notFound.tip')}</p>
        </div>
      </div>
    </div>
  );
}