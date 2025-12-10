import React from 'react'
import { loaders } from '../loader/Loader'
import { customStyles } from './DataTableStyle'
import DataTable from 'react-data-table-component'

const DataTableComponents = ({
    columns,
    currentPageData,
    loader,
    filterDataLength,
    perPage,
    handleRowsPerPageChange,
    handlePageChange,
    onRowClicked,
    pointerOnHover = false,
    // highlightOnHover = false,
    conditionalRowStyles = [],
    expandableRows = false,
    ExpandableComponent = null,
    expandOnRowClicked = false,
    expandableRowExpanded,
    noDataTable
}) => {
    return (
        <>

            <div className="overflow-x-auto w-full">
                <DataTable
                    columns={columns}
                    data={currentPageData}
                    keyField="id"
                    progressPending={loader}
                    progressComponent={loaders.table}
                    noDataComponent={loaders.noDataTable(noDataTable)}
                    pagination
                    paginationServer
                    paginationTotalRows={filterDataLength}
                    paginationPerPage={perPage}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    onChangePage={handlePageChange}
                    customStyles={{
                        ...customStyles,
                        table: {
                            style: {
                                ...customStyles.table?.style,
                                border: loader ? "0px" : "1px solid #0000001f",
                                borderRadius: "16px",
                            },
                        },
                    }}
                    responsive
                    onRowClicked={onRowClicked}
                    pointerOnHover={pointerOnHover}
                    conditionalRowStyles={conditionalRowStyles}
                    expandableRows={expandableRows}
                    expandableRowsComponent={ExpandableComponent}
                    expandOnRowClicked={expandOnRowClicked}
                    expandableRowExpanded={expandableRowExpanded}
                    expandableRowsHideExpander
                // highlightOnHover={highlightOnHover}
                // theme='blackTheme'
                />
            </div>

        </>
    )
}

export default DataTableComponents