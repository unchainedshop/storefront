import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto mb-16">{children}</main>
    </>
  );
};

export default Layout;
