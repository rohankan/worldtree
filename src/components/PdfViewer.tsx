import React, {FC} from "react"
// import {Collection, Page, pdfjs} from "react-pdf"
import styled from "styled-components"

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const StyledPdfViewer = styled.iframe`
  width: 80%;
  height: 100vh; 
`

export const PdfViewer: FC<{
    src: string;
}> = ({src}) => (
  <StyledPdfViewer src={src}/>
  // <Collection
  //     file={{url: 'http://www.r-5.org/files/books/computers/internals/net/Richard_Stevens-TCP-IP_Illustrated-EN.pdf'}}
  // />
)
