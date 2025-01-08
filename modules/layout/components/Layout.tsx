import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto mb-6 sm:mb-16">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
