import Link from 'next/link';
import { useIntl } from 'react-intl';


import LanguageSwitch from '../../common/components/LanguageSwitch';
const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  legal: [
    { name: 'Terms of Service', href: '#' },
    { name: 'Return Policy', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Shipping Policy', href: '#' },
  ],
  bottomLinks: [
    { name: 'Accessibility', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
}

const Footer = () => {
  const intl = useIntl();
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200">
        <div className="pt-16 pb-20">
          <div className="md:flex md:justify-center">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt=""
              className="h-8 w-auto"
            />
          </div>
          <div className="mt-16 max-w-5xl mx-auto xl:grid xl:grid-cols-2 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Products</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.products.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.customerService.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Company</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Legal</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
          <div className="bg-gray-100 rounded-lg p-6 flex items-center sm:p-10">
            <div className="max-w-sm mx-auto">
              <h3 className="font-semibold text-gray-900">Sign up for our newsletter</h3>
              <p className="mt-2 text-sm text-gray-500">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
              <form className="mt-4 sm:mt-6 sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <div className="mt-3 sm:flex-shrink-0 sm:mt-0 sm:ml-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-6 relative py-12 px-6 flex items-center sm:py-16 sm:px-10 lg:mt-0">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/footer-02-exclusive-sale.jpg"
                alt=""
                className="w-full h-full filter saturate-0 object-center object-cover"
              />
              <div className="absolute inset-0 bg-indigo-600 bg-opacity-90" />
            </div>
            <div className="relative max-w-sm mx-auto text-center">
              <h3 className="text-2xl font-extrabold tracking-tight text-white">Get early access</h3>
              <p className="mt-2 text-gray-200">
                Did you sign up to the newsletter? If so, use the keyword we sent you to get access.{' '}
                <a href="#" className="font-bold text-white whitespace-nowrap hover:text-gray-200">
                  Go now<span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-500">&copy; 2021 All Rights Reserved</p>
        </div>

        <div className="mt-4 flex items-center justify-center md:mt-0">
          <div className="flex space-x-8">
            {/* {footerNavigation.bottomLinks.map((item) => (
              <a key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-600">
                {item.name}
              </a> */}
            {/* ))} */}


            <Link href="/terms-conditions">
          <a className="mr-4 mb-3">
            {intl.formatMessage({ id: 'conditions' })}
          </a>
        </Link>
        <Link href="/privacy-policy">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'privacy' })}</a>
        </Link>
        <Link href="/imprint">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'imprint' })}</a>
        </Link>
        <Link href="/about">
          <a className="mr-4 mb-3">{intl.formatMessage({ id: 'about' })}</a>
        </Link>



          </div>

          <div className="ml-6 border-l border-gray-200 pl-6">
            {/* <a href="#" className="flex items-center text-gray-500 hover:text-gray-600">
              <img
                src="https://tailwindui.com/img/flags/flag-canada.svg"
                alt=""
                className="w-5 h-auto flex-shrink-0"
              />
              <span className="ml-3 text-sm">Change</span>
              <span className="sr-only">location and currency</span>
            </a> */}
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
