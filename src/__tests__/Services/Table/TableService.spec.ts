import { getSortedDebts } from '../../../Services/Table';
import { DebtApi } from '../../../Services/Api/interfaces';

describe('TableService', () => {
  describe('getSortedDebts()', () => {
    it('should sort ascendant debts by name, first should be debt with name Kazimierz', () => {
      const data: DebtApi[] = [
        {
          Id: 1,
          Number: 'DI/KOSZT/P/138483',
          Name: 'Marcin Szymczak (Test)',
          Value: 10000.0,
          NIP: 1112223301,
          Date: '2017-03-01T00:00:00',
          DocumentType: 'Faktura VAT',
          Price: 12300.0,
          Address: 'ul. Paderewskiego 13 50-312 Wrocław',
        },
        {
          Id: 2,
          Number: 'DI/PLUS/P/4493',
          Name: 'Kazimierz Górski (Test)',
          Value: 4000.0,
          NIP: 1112223302,
          Date: '2017-03-30T00:00:00',
          DocumentType: 'Inne',
          Price: 5883.0,
          Address: 'ul. Moniuszki 3/1 50-312 Wrocław',
        },
      ];

      const debts: DebtApi[] = data;
      const sortField = 'Name';
      const sortOrder = 'asc';
      const sortedDebts = getSortedDebts(debts, sortField, sortOrder);

      expect(sortedDebts).toEqual([
        {
          Id: 2,
          Number: 'DI/PLUS/P/4493',
          Name: 'Kazimierz Górski (Test)',
          Value: 4000.0,
          NIP: 1112223302,
          Date: '2017-03-30T00:00:00',
          DocumentType: 'Inne',
          Price: 5883.0,
          Address: 'ul. Moniuszki 3/1 50-312 Wrocław',
        },
        {
          Id: 1,
          Number: 'DI/KOSZT/P/138483',
          Name: 'Marcin Szymczak (Test)',
          Value: 10000.0,
          NIP: 1112223301,
          Date: '2017-03-01T00:00:00',
          DocumentType: 'Faktura VAT',
          Price: 12300.0,
          Address: 'ul. Paderewskiego 13 50-312 Wrocław',
        },
      ]);
    });
  });
});
