import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { pdfjs, Document, Page } from 'react-pdf';

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
    ).toString();

  const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
  };

const PdfViewer = ({ pdfFile }) => {

  //클릭하면 PDF 새창 열기 
  const openPdfInNewTab = () => {
    const byteCharacters = atob(pdfFile);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, '_blank');
  };


    return (
        <div onClick={openPdfInNewTab}>
        <Document file={`data:application/pdf;base64,${pdfFile}`} options={options} >
              <Page
              width={320}
              height={300}
              pageNumber={1} />
          </Document>
          </div>
    );
};
export default PdfViewer;