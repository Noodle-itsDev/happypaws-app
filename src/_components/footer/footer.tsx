import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Mi App</h3>
            <p className="text-gray-400">Una breve descripción de tu aplicación aquí.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Enlaces rápidos</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><a href="/" className="hover:text-white">Inicio</a></li>
              <li className="mb-2"><a href="/about" className="hover:text-white">Acerca de</a></li>
              <li className="mb-2"><a href="/contact" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Contáctanos</h3>
            <p className="text-gray-400">Email: info@miapp.com</p>
            <p className="text-gray-400">Teléfono: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 Mi App. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;