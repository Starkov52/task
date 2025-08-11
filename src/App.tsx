import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FormSections from './components/formSections'
import ProductTable from './components/productTabel'
import React from 'react'

function App() {
  //Form's
  const [token,setToken] = React.useState<string>("f1fd5b7f0b6669c9c5e799c64d9d941b632462fe46a8cd36cf6279dbc5012c78")
  const [phone,setPhone] = React.useState<string>("")
  const [check,setCheck] = React.useState<string>("")
  const [organization,setOrganization] = React.useState<string>("")
  const [warehouse,setWarehouse] = React.useState<string>("")
  const [price,setPrice] = React.useState<string>("")
  const [organizationList,setOrganizationList] = React.useState<any>([])
  const [contragetnsList,setContragentsList] = React.useState<any>([])
  const [checkList,setCheckList] = React.useState<any>([])
  const [priceList,setPriceList] = React.useState<any>([])
  const [warehousesList,setWarehousesList] = React.useState<any>([])
  const [nomenclaturelist,setNomenclatureList] = React.useState<any>([])
async function getPayloadData() {
  
 await fetch(`https://app.tablecrm.com/api/v1/organizations/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77`,{
    headers: {'Content-Type': 'application/json'},
    method:'GET'
  }).then((response) => {
    return  response.json()
  
  }).then((response) => { setOrganizationList([...response.result])})
  
  await fetch(`https://app.tablecrm.com/api/v1/contragents/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77`,{
    headers: {'Content-Type': 'application/json'},
    method:'GET'
  }).then((response) => {
    return  response.json()
  
  }).then((response) => { setContragentsList([...response.result])})
  await fetch(`https://app.tablecrm.com/api/v1/warehouses/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77`,{
    headers: {'Content-Type': 'application/json'},
    method:'GET'
  }).then((response) => {
    return  response.json()
  
  }).then((response) => { setWarehousesList([...response.result])})
  await fetch(`https://app.tablecrm.com/api/v1/price_types/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77`,{
    headers: {'Content-Type': 'application/json'},
    method:'GET'
  }).then((response) => {
    return  response.json()
  
  }).then((response) => { setPriceList([...response.result])})
  await fetch(`https://app.tablecrm.com/api/v1/payments/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77`,{
    headers: {'Content-Type': 'application/json'},
    method:'GET'
  }).then((response) => {
    return  response.json()
  
  }).then((response) => { setCheckList([...response.result])})
  
  await fetch(`https://app.tablecrm.com/api/v1/nomenclature/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77`,{
    headers: {'Content-Type': 'application/json'},
    method:'GET'
  }).then((response) => {
    return  response.json()
  
  }).then((response) => { setNomenclatureList([...response.result])})
  
 
 

}
  //Table
  const [searchInput,setSearchInput] = React.useState<string>("")
  React.useEffect(() => {
getPayloadData()
  },[])
  return (
    <>
      <div onClick={() => {console.log(nomenclaturelist)}} className='main'>
        <FormSections organizationList={organizationList} contragetnsList={contragetnsList} warehousesList={warehousesList}  checkList={checkList} priceList={priceList} token={token} setToken={setToken} phone={phone} setPhone={setPhone} check={check} setCheck={setCheck} organization={organization} setOrganization={setOrganization} warehouse={warehouse} setWarehouse={setWarehouse} price={price} setPrice={setPrice} ></FormSections>
        <ProductTable nomenclature={nomenclaturelist} searchInput={searchInput} setSearchInput={setSearchInput}></ProductTable>
       </div>
       
    </>
  )
}

export default App
