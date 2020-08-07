import React from 'react';
import { RsApi } from "../Containers/RsApi";
import Modal from './Modal';

const TableList = () => {
    const [tableData, setTableData] = React.useState([])
    const [userData, setUserData] = React.useState({})
    const [isOpen, setIsOpen] = React.useState(false)
    const [indicativeSize, setIndicativeSize] = React.useState('');
    const [cleanPrice, setCleanPrice] = React.useState('');
    const [validations, setValidations] = React.useState({});

    React.useEffect(() => {
        getMarketPrice()
    }, [])

    const getMarketPrice = async () => {
        try {
            const result = await RsApi.get({
            path: "https://table-mock-api.anmolsukki.repl.co/users"
            })
            setTableData(result.data)
            console.log("==result==", result)
        }
        catch (error) {
            console.log("===resultError==>>", error)
        }
    };

    const modalOpen = (val, data) => {
        setIsOpen(val)
        setUserData(data)
    }

    
  const validateBuyOrder = () => {
    let status = true;
    let validations = {};
      if (!parseFloat(indicativeSize)) {
        validations.indicativeSize = ' ';
        status = false;
      }
      if (!parseFloat(cleanPrice)) {
        validations.cleanPrice = ' ';
        status = false;
      }
    setValidations(validations);
    return status;
  };

  const validateIntegerOnly = (characterToValidate) => {
    return !isNaN(parseInt(characterToValidate)) || !characterToValidate ? true : false;
  };

  const saveBuyOrder = async () => {
    if (validateBuyOrder()) {
      alert(`Indicative Size: ${indicativeSize} \n Clean Price: ${cleanPrice}`)
    }
  };

    return (
        <React.Fragment>
            <table id="customers">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Yield</th>
                        <th>Principe</th>
                        <th>Accrued</th>
                        <th>Net Amount</th>
                        <th>Action</th>
                    </tr>
                    {tableData.map(data => {
                        return(
                            <tr key={data.id}>
                                <td>{data.firstName}</td>
                                <td>{data.indicativeSize}</td>
                                <td>{data.cleanPrice}</td>
                                <td>{data.indicativeYield}</td>
                                <td>{data.principle}</td>
                                <td>{data.accrued}</td>
                                <td>{data.netAmount}</td>
                                <td><button className="btn third" onClick={() => modalOpen(true, data)}>Open</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                <h2>Sign In</h2>
                <input type="text" placeholder="#Token" className={`form-input ${!parseFloat(indicativeSize) && validations.indicativeSize ? 'required-field' : ''}`} onChange={e => validateIntegerOnly(e.nativeEvent.data) && setIndicativeSize(e.target.value)} />
                <input type="text" placeholder="CHF" className={`form-input ${!parseFloat(cleanPrice) && validations.cleanPrice ? 'required-field' : ''}`} onChange={e => validateIntegerOnly(e.nativeEvent.data) && setCleanPrice(e.target.value)} />
                <button className="btn btn-primary" onClick={saveBuyOrder}>Login</button>
            </div>
            { isOpen && <Modal isOpen={isOpen} modalOpen={modalOpen} userData={userData} /> }
        </React.Fragment>
    )
}

export default TableList;
