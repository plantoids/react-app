import React, { useState } from 'react';
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import pdf from './plantoids-detailed-roadmap_compressed.pdf';
export const Pdf = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }


    return (
        <>
        <Document
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
            className = "pdf"
        >
            <Page pageNumber={pageNumber} />
        </Document>
        <div className='Pdf-page'>
            <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>
        </div>
        <div className='Pdf-buttons'>
            <button
            className='Pdf-button'
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            >
            Previous
            </button>
            <button
            className='Pdf-button'
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            >
            Next
            </button>
        </div>
        </>
    );
}