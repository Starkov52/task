
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import ChoiseList from "./choiseList";
interface TableTypes {
    searchInput:string,
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
    nomenclature: any[]
}
const ProductTable = ({searchInput,setSearchInput,nomenclature}:TableTypes) => {
  const [showNomenclatureList,setShowNomenclatureList] = React.useState<boolean>(false)
  const [nID,setNID] = React.useState<string>("")
  const [container,setContainer] = React.useState<any[]>([])
  const [containerForPost,setContainerForPost] = React.useState<any[]>([])
  const deleteItem =(targetId:string) => {
    const newContainer = container.filter((item) => item.id !== targetId)
    setContainer([...newContainer])
  }
  async function postProduct() {
    const bodyData = [
      {
        dated: 1754511851, // число в секундах
        operation: "Заказ",
        tax_included: true,
        tax_active: true,
        goods: containerForPost.map(item => ({
          price: Number(item.price),
          quantity: Number(item.quantity ?? 1),
          unit: Number(item.unit), // ID единицы измерения
          discount: Number(item.discount ?? 0),
          sum_discounted: Number(item.sum_discounted ?? 0),
          nomenclature: Number(item.nomenclature), // ID номенклатуры
        })),
        settings: { date_next_created: null },
        loyality_card_id: 22476,
        warehouse: 39,
        contragent: 355176,
        paybox: 759,
        organization: 38,
        status: false,
        paid_rubles: 476.2,
        paid_lt: 23.8,
      }
    ];
  
    console.log("Отправляем:", bodyData);
  
    const res = await fetch(
      `https://app.tablecrm.com/api/v1/docs_sales/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(bodyData),
      }
    );
  
    const text = await res.text();
    console.log("Ответ сервера:", res.status, text);
  
  
  setContainer([])
  }
  const getItemName = (item: any) =>
    item.name ?? item.short_name ?? item.contragent_name ?? "";
  async function getProductData() {
    try {
      const response = await fetch(
        `https://app.tablecrm.com/api/v1/alt_prices/${nID}/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77&price_type_id=80`,
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        }
      );
  
      const data = await response.json();
  
      console.log(data);
  
      // Добавляем полный ответ в container
      setContainer((prevState) => [...prevState, data]);
  
      // Добавляем подготовленную позицию для отправки
      setContainerForPost((prev) => [
        ...prev,
        {
          price: data.price,
          quantity: 1,
          unit: data.unit,
          discount: 0,
          sum_discounted: 0,
          nomenclature: data.nomenclature_id,
        },
      ]);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  }
  
    return (
        <div className="productTable">
            <div className="productTable__searchContainer">
                <input onClick={() => getProductData()}  value={'Выбрать'} type="button" className="productTable__searchContainerBtn"></input>
                <input onClick={() => setShowNomenclatureList(true)} type="text" value={searchInput} onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setSearchInput(event.target.value)}} className="productTable__searchContainerInput"></input>
                {showNomenclatureList && (
          <ChoiseList
            data={nomenclature}
            onSelect={(item) => {
              setSearchInput(getItemName(item));
              setShowNomenclatureList(false);
              setNID(item.id)
            }}
            selectedValue={searchInput}
          />
        )}
            </div>
            <div className="productTable__outputContainer">{
              container.map((item,index) => {
                return (
                <div key={index} className="productTable__outputContainerItem">
  <div className="productTable__outputContainerProductName">
    <span className="productTable__outputContainerProductNameLabel">Название товара</span>
    <span className="productTable__outputContainerProductNameValue">{item.nomenclature_name}</span>
  </div>
  <div className="productTable__outputContainerSum">
    <span className="productTable__outputContainerSumLabel">Сумма</span>
    <span className="productTable__outputContainerSumValue">{item.price}</span>
  </div>
  <div className="productTable__outputContainerDiscount">
    <span className="productTable__outputContainerDiscountLabel">Скидка</span>
    <span className="productTable__outputContainerDiscountValue">{''}</span>
  </div>
  <div className="productTable__outputContainerQuantity">
    <span className="productTable__outputContainerQuantityLabel">Кол-во</span>
    <span className="productTable__outputContainerQuantityValue">{item.unit}</span>
  </div>
  <div className="productTable__outputContainerTotal">
    <span className="productTable__outputContainerTotalLabel">Итого</span>
    <span className="productTable__outputContainerTotalValue">{item.price}</span>
  </div>
  <div className="productTable__outputContainerAction">
   <AiOutlineDelete onClick={()=> deleteItem(item.id)}className="productTable__outputContainerBtn" size={35}></AiOutlineDelete>
  </div>
  </div>
               ) })

  
}
</div>
<div onClick={() =>postProduct()}className="sendBtns">
            <input type="button" className="sendBtns__createAndSend" value="Создать и провести"></input>
            <input type="button" className="sendBtns__create" value="Только создать"></input>
        </div>
        </div>
      
    )
}
export default ProductTable