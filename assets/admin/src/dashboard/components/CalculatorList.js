import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';
import { string } from '../common/text';


const CalculatorList = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    let data = {
      'action': 'ascode_load_calculator_info_action',
      '_ajax_nonce': ascodeWooCalculatorDashboard.nonce,
    };

    jQuery.post(ajaxurl, data, (response) => {
      setData(response.data);
    });

  }, []);

  const handleDeleteCalculator = (calculatorId) => {
    let data = {
      'action': 'ascode_delete_calculator_action',
      'calculatorId': calculatorId,
      '_ajax_nonce': ascodeWooCalculatorDashboard.nonce,
    };

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        jQuery.post(ajaxurl, data, (response) => {
          setData(response.data.data);
          Swal.fire(
            'Deleted!',
            response.data.message,
            'success'
          )
        });
      }
    })
  }

  const handleCopy = (shortcode) => {
    navigator.clipboard.writeText(shortcode);
  }


  return (
    // <div className='m-2 p-2	border border-gray-600 rounded'>
    <div className='bg-white p-6 rounded'>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center border p-4 rounded">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">{string.calculatorList}</h1>
            <p className="mt-2 text-sm text-gray-700">{string.calculatorListSubtitle}</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link to='/add-calculator'>
              <button type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{string.addNewButton}</button>
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">{string.tableHeading.title}</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{string.tableHeading.description}</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{string.tableHeading.shortcode}</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{string.tableHeading.action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((row, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{row.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.description}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex">
                          {row.shortcode}
                          <DocumentDuplicateIcon
                            className='h-5 w-4 ml-2'
                            onClick={() => handleCopy(row.shortcode)}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button
                            onClick={(e) => handleDeleteCalculator(row.id)}
                            className="rounded-3xl bg-red-50 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            <TrashIcon className="h-5 w-5 text-red-500" />
                          </button>
                          <Link to={'/edit-calulator/' + row.id}>
                            <button
                              className="rounded-3xl ml-1 bg-blue-50 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              <PencilIcon className="h-5 w-5 text-blue-500" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default CalculatorList;