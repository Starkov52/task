import React from "react";
import ChoiseList from "./choiseList";

interface ClientFormForSaleProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;

  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;

  check: string;
  setCheck: React.Dispatch<React.SetStateAction<string>>;

  organization: string;
  setOrganization: React.Dispatch<React.SetStateAction<string>>;

  warehouse: string;
  setWarehouse: React.Dispatch<React.SetStateAction<string>>;

  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;

  priceList: any[];
  organizationList: any[];
  contragetnsList: any[];
  warehousesList: any[];
  checkList: any[];
}

const FormSections = ({
  token,
  setToken,
  phone,
  setPhone,
  checkList,
  warehousesList,
  priceList,
  organizationList,
  check,
  setCheck,
  organization,
  setOrganization,
  warehouse,
  setWarehouse,
  price,
  setPrice,
}: ClientFormForSaleProps) => {
  const [showOrganizationList, setShowOrganizationList] = React.useState<boolean>(false);

  const [showCheckList, setShowCheckList] = React.useState<boolean>(false);
  const [showPriceList, setShowPriceList] = React.useState<boolean>(false);
  const [showWarehousesList, setShowWarehousesList] = React.useState<boolean>(false);

  // Функция для получения имени для отображения в списке
  const getItemName = (item: any) =>
    item.name ?? item.short_name ?? item.contragent_name ?? "";

  // Обработчик клика вне списка - чтобы закрывать списки
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(".organizationWrapper")) setShowOrganizationList(false);
      if (!target.closest(".checkWrapper")) setShowCheckList(false);
      if (!target.closest(".priceWrapper")) setShowPriceList(false);
      if (!target.closest(".warehouseWrapper")) setShowWarehousesList(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <form className="clientFormForSale" style={{ position: "relative" }}>
      <div className="clientFormForSale__tokenCase">
        <span className="clientFormForSale__tokenCaseLabel">Токен ID</span>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          type="text"
          className="clientFormForSale__tokenCaseInput"
        />
      </div>

      <div className="clientFormForSale__phoneCase">
        <div className="clientFormForSale__phoneCaseContainer">
          <span className="clientFormForSale__phoneCaseLabel">Номер телефона</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="clientFormForSale__phoneCaseInput"
          />
        </div>
        <input type="button" value={"Поиск"} className="clientFormForSale__phoneCaseSearch" />
      </div>

      {/* Check с выбором */}
      <div className="clientFormForSale__checkCase checkWrapper" style={{ position: "relative" }}>
        <span className="clientFormForSale__checkCaseLabel">Счет поступления</span>
        <input
          value={check}
          onChange={(e) => setCheck(e.target.value)}
          onClick={() => setShowCheckList(true)}
          type="text"
          className="clientFormForSale__checkCaseInput"
          autoComplete="off"
        />
        {showCheckList && (
          <ChoiseList
            data={checkList}
            onSelect={(item) => {
              setCheck(getItemName(item));
              setShowCheckList(false);
            }}
            selectedValue={check}
          />
        )}
      </div>

      {/* Организация с выбором */}
      <div
        className="clientFormForSale__organizationCase organizationWrapper"
        style={{ position: "relative" }}
      >
        <span className="clientFormForSale__organizationCaseLabel">Организация</span>
        <input
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          onClick={() => setShowOrganizationList(true)}
          type="text"
          className="clientFormForSale__organizationCaseInput"
          autoComplete="off"
        />
        {showOrganizationList && (
          <ChoiseList
            data={organizationList}
            onSelect={(item) => {
              setOrganization(getItemName(item));
              setShowOrganizationList(false);
            }}
            selectedValue={organization}
          />
        )}
      </div>

      {/* Склад отгрузки с выбором */}
      <div
        className="clientFormForSale__warehouseCase warehouseWrapper"
        style={{ position: "relative" }}
      >
        <span className="clientFormForSale__warehouseCaseLabel">Склад отгрузки</span>
        <input
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
          onClick={() => setShowWarehousesList(true)}
          type="text"
          className="clientFormForSale__warehouseCaseInput"
          autoComplete="off"
        />
        {showWarehousesList && (
          <ChoiseList
            data={warehousesList}
            onSelect={(item) => {
              setWarehouse(getItemName(item));
              setShowWarehousesList(false);
            }}
            selectedValue={warehouse}
          />
        )}
      </div>

      {/* Тип цены с выбором */}
      <div className="clientFormForSale__priceCase priceWrapper" style={{ position: "relative" }}>
        <span className="clientFormForSale__priceCaseLabel">Тип цены</span>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onClick={() => setShowPriceList(true)}
          type="text"
          className="clientFormForSale__priceCaseInput"
          autoComplete="off"
        />
        {showPriceList && (
          <ChoiseList
            data={priceList}
            onSelect={(item) => {
              setPrice(getItemName(item));
              setShowPriceList(false);
            }}
            selectedValue={price}
          />
        )}
      </div>
    </form>
  );
};

export default FormSections;
