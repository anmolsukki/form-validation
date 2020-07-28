import React from 'react';
import { RsApi } from "../Containers/RsApi";
import Modal from './Modal';

const TableList = () => {
    const [tableData, setTableData] = React.useState([])
    const [userData, setUserData] = React.useState({})
    const [isOpen, setIsOpen] = React.useState(false)

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
            { isOpen && <Modal isOpen={isOpen} modalOpen={modalOpen} userData={userData} /> }
        </React.Fragment>
    )
}

export default TableList;
