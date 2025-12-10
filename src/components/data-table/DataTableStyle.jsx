// DataTable
import { createTheme } from "react-data-table-component";

// Theme
createTheme('blackTheme', {
    text: {
        primary: '#ffffff',
        secondary: '#b2b2b2',
    },
    background: {
        default: '#000000',
    },
    divider: {
        default: '#333333',
    },
    pagination: {
        background: '#000000',
        color: '#ffffff',
    },
    rows: {
        highlightOnHoverBackground: '#333333',
    },
});

// css
export const customStyles = {
    table: {
        style: {
            border: '0px !important'
        },
    },
    header: {
        style: {
            backgroundColor: '#101316 !important',
        },
    },
    headCells: {
        style: {
            fontSize: '16px',
            fontWeight: '500',
            color: '#313131 !important'
        },
    },
    cells: {
        style: {
            fontSize: '14px',
            fontWeight: '400',
            color: '#313131 !important'
        },
    },
    pagination: {
        style: {
            color: '#000',
            fontSize: '13px',
            fontWeight: '500',
        },
    },
    expanderRow: {
        style: {
            backgroundColor: '#F1F5F9 !important',
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px"
        },
    },
    expanderButton: {
        style: {
            backgroundColor: 'transparent !important',
            borderRadius: 0,
            '&:hover': {
                backgroundColor: 'transparent !important',
            },
            '&:focus': {
                backgroundColor: 'transparent !important',
                outline: 'none',
            },
        },
    },
    expanderCell: {
        style: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
    },
};