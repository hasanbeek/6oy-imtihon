import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { totalAmount, cart, dispatch } = useGlobalContext();
  const { t, i18n } = useTranslation();

  const langList = ["uz", "en", "ru"];
  const languages = {
    uz: "O'zbek",
    en: "English",
    ru: "Русский",
  };

  const handleLanguageChange = (language) => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  };

  return (
    <header className="header">
      <div className="header__container">
        <h2 className="header__logo">
          <Link to="/">Mini Store App</Link>
        </h2>

        <nav className="header__nav">
          <select
            className="header__lang-select"
            value={i18n.language}
            onChange={({ target: { value } }) => handleLanguageChange(value)}
          >
            {langList.map((lag) => (
              <option key={lag} value={lag}>
                {languages[lag]}
              </option>
            ))}
          </select>

          <Sheet>
            <SheetTrigger>
              <div className="header__cart-icon">
                <FaShoppingCart size={24} />
                {totalAmount > 0 && (
                  <span className="header__cart-badge">{totalAmount}</span>
                )}
              </div>
            </SheetTrigger>

            <SheetContent side="right" className="header__sheet">
              <div className="cart-items">
                {cart.length > 0 ? (
                  cart.map((item) => {
                    const { id, title, price, description, category, brand } =
                      item;
                    return (
                      <div key={id} className="cart-item">
                        <div className="cart-item__info">
                          <h4 className="cart-item__title">{title}</h4>
                          <p className="cart-item__desc">{description}</p>
                          <p className="cart-item__brand">{brand}</p>
                          <p className="cart-item__category">{category}</p>
                          <p className="cart-item__price">Price: ${price}</p>
                        </div>
                        <button
                          onClick={() =>
                            dispatch({ type: "DELETE", payload: id })
                          }
                          className="cart-item__delete"
                          title="Remove from cart"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p className="cart-empty-text">{t("Cart is empty")}</p>
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-footer">
                  <button
                    onClick={() => dispatch({ type: "CLEAR" })}
                    className="cart-footer__clear-btn"
                  >
                    {t("Clear Cart")}
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
