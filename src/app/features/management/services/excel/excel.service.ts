import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js'
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {

  }

  async generateExcel(arrayOfArrays: any[][]) {


    // Excel Title, Header, Data
    const title = 'DISTRIBUCIÓN DE COMPENSACIONES POR EXPORTACIONES DE CARNE DE BOVINO';
    const header = ['EMPRESA', 'COMP SOLICTDA $', '1. ROUND', '2. ROUND', 'FINAL'];
    const data = arrayOfArrays;

    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('DISTRIBUCION');


    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);

    let currentDate = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const subTitleRow = worksheet.addRow(['FECHA : ' + currentDate]);

    worksheet.mergeCells('A1:D2');


    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    // Add Data and Conditional Formatting
    data.forEach(d => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(5);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999';
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      };
    }

    );

    worksheet.getColumn(3).width = 40;
    worksheet.getColumn(4).width = 40;
    worksheet.addRow([]);


    // Footer Row
    const footerRow = worksheet.addRow(['OMEGAN.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'PREAPROBADOS.xlsx');
    });

  }



  async generateExcelLiquidation(arrayOfArrays: any[]) {

    // Excel Title, Header, Data
    const title = 'LIQUIDACIÓN DE LAS COMPENSACIONES';
    const header = ['COMPENSACION OTORGADA No.', 'ANUNCIO No', 'SOLICITUD DE COMPENSACION No',
      'FECHA RADICACION SOLICITUD COMPENSACION:', 'FECHA DE LIQUIDACION', 'EXPORTADOR',
      'CONVENIO No.', 'PRODUCTO COMPENSADO', 'PARTIDA ARANCELARIA', 'FECHA EXPORTACION', 'PAIS',
      'MES A COMPENSAR', 'KILOGRAMOS A EXPORTAR:', 'VALOR COMPENSADO POR KILOGRAMO, DOLARES',
      'T.R.M.', 'VALOR COMPENSADO POR KILOGRAMO, PESOS', 'VALOR COMPENSACION OTORGADA'];
    const data = arrayOfArrays;

    // Create workbook and worksheet
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('COMPENSACIONES');


    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);

    let currentDate = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const subTitleRow = worksheet.addRow(['FECHA : ' + currentDate]);

    worksheet.mergeCells('A1:D2');

    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    // Add Data and Conditional Formatting
    data.forEach(d => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999';
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      };
    }

    );

    worksheet.getColumn(3).width = 40;
    worksheet.getColumn(4).width = 40;
    worksheet.addRow([]);


    // Footer Row
    const footerRow = worksheet.addRow(['OMEGAN.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };

    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'LIQUIDACIÓNDELASCOMPENSACIONES.xlsx');
    });
  }


  

}
