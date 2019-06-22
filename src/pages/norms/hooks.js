import React from 'react';

export default function usePredicates() {
  const [predicates, setPredicates] = React.useState('');

  React.useEffect(() => {
    setPredicates(PREDICATES);
  }, []);

  return predicates;
}


const PREDICATES = {
  conectors: [
    {
      conector: 'IS',
      value: 'Es',
      symbol: 'Es',
      type: 'unary',
      argumentName: 'predicate',
      argumentType: 'single',
    },
    {
      conector: 'NOT',
      value: 'No Es',
      symbol: '¬',
      type: 'unary',
      argumentName: 'predicate',
      argumentType: 'single',
    },
    {
      conector: 'OR',
      value: 'O',
      symbol: '||',
      type: 'unary',
      argumentName: 'predicates',
      argumentType: 'list',
    },
    {
      conector: 'AND',
      value: 'Y',
      symbol: '&&',
      type: 'unary',
      argumentName: 'predicates',
      argumentType: 'list',
    },
    {
      conector: 'IMPL',
      value: 'Implica',
      symbol: '⇒',
      type: 'binary',
      argumentName: 'antecedent',
      argumentType: 'single',
      secondArgumentName: 'consequent',
      secondArgumentType: 'single',
    },
    {
      conector: 'DOUBLE_IMPL',
      value: 'Si y Sólo si',
      symbol: '⇔',
      type: 'binary',
      argumentName: 'antecedent',
      argumentType: 'single',
      secondArgumentName: 'consequent',
      secondArgumentType: 'single',
    },
  ],
  criterias: [
    {
      entity: 'PRESCRIPTION',
      value: 'Receta',
      quantificable: false,
      attributes: [
        {
          attribute: 'PROLONGED_TREATMENT',
          value: 'Tratamiento Prolongado',
          type: 'boolean',
        },
        {
          attribute: 'DIAGNOSIS',
          value: 'Diagnóstico',
          type: 'string',
        },
        {
          attribute: 'ITEMS_COUNT',
          value: 'Cantidad de Items',
          type: 'number',
        },
      ],
    },
    {
      entity: 'ITEM_PRESCRIBED',
      value: 'Item Prescripto',
      quantificable: true,
      attributes: [
        {
          attribute: 'QUANTITY',
          value: 'Cantidad',
          type: 'number',
        },
        {
          attribute: 'DESCRIPTION',
          value: 'Descripción',
          type: 'string',
        },
        {
          attribute: 'PHARMACEUTICAL_ACTION',
          value: 'Acción Farmacéutica',
          type: 'string',
        },
        {
          attribute: 'TROQUEL',
          value: 'Troquel',
          type: 'code',
        },
        {
          attribute: 'BARCODE',
          value: 'Codigo de Barra',
          type: 'code',
        },
        {
          attribute: 'DRUG',
          value: 'Droga',
          type: 'string',
        },
        {
          attribute: 'SIZE',
          value: 'Tamaño',
          type: 'string',
        },
        {
          attribute: 'PRESENTATION',
          value: 'Presentacion',
          type: 'string',
        },
        {
          attribute: 'LABORATORY',
          value: 'Laboratorio',
          type: 'string',
        },
        {
          attribute: 'POTENCY',
          value: 'Potencia',
          type: 'string',
        },
      ],
    },
    {
      entity: 'ITEM_RECEIVED',
      value: 'Item Recepcionado',
      quantificable: true,
      attributes: [
        {
          attribute: 'QUANTITY',
          value: 'Cantidad',
          type: 'number',
        },
        {
          attribute: 'DESCRIPTION',
          value: 'Descripción',
          type: 'string',
        },
        {
          attribute: 'PHARMACEUTICAL_ACTION',
          value: 'Acción Farmacéutica',
          type: 'string',
        },
        {
          attribute: 'TROQUEL',
          value: 'Troquel',
          type: 'code',
        },
        {
          attribute: 'BARCODE',
          value: 'Codigo de Barra',
          type: 'code',
        },
        {
          attribute: 'DRUG',
          value: 'Droga',
          type: 'string',
        },
        {
          attribute: 'SIZE',
          value: 'Tamaño',
          type: 'string',
        },
        {
          attribute: 'PRESENTATION',
          value: 'Presentacion',
          type: 'string',
        },
        {
          attribute: 'LABORATORY',
          value: 'Laboratorio',
          type: 'string',
        },
        {
          attribute: 'POTENCY',
          value: 'Potencia',
          type: 'string',
        },
      ],
    },
    {
      entity: 'ITEM_AUDITED',
      value: 'Item Auditado',
      quantificable: true,
      attributes: [
        {
          attribute: 'QUANTITY',
          value: 'Cantidad',
          type: 'number',
        },
        {
          attribute: 'DESCRIPTION',
          value: 'Descripción',
          type: 'string',
        },
        {
          attribute: 'PHARMACEUTICAL_ACTION',
          value: 'Acción Farmacéutica',
          type: 'string',
        },
        {
          attribute: 'TROQUEL',
          value: 'Troquel',
          type: 'code',
        },
        {
          attribute: 'BARCODE',
          value: 'Codigo de Barra',
          type: 'code',
        },
        {
          attribute: 'DRUG',
          value: 'Droga',
          type: 'string',
        },
        {
          attribute: 'SIZE',
          value: 'Tamaño',
          type: 'string',
        },
        {
          attribute: 'PRESENTATION',
          value: 'Presentacion',
          type: 'string',
        },
        {
          attribute: 'LABORATORY',
          value: 'Laboratorio',
          type: 'string',
        },
        {
          attribute: 'POTENCY',
          value: 'Potencia',
          type: 'string',
        },
      ],
    },
    {
      entity: 'AFFILIATE',
      value: 'Afiliado',
      quantificable: false,
      attributes: [
        {
          attribute: 'AGE',
          value: 'Edad',
          type: 'number',
        },
        {
          attribute: 'GENDER',
          value: 'Sexo',
          type: 'string',
        },
        {
          attribute: 'NATIONALITY',
          value: 'Nacionalidad',
          type: 'string',
        },
        {
          attribute: 'CREDENTIAL',
          value: 'Credencial',
          type: 'string',
        },
        {
          attribute: 'PLAN',
          value: 'Plan',
          type: 'string',
        },
      ],
    },
    {
      entity: 'DOCTOR',
      value: 'Médico',
      quantificable: false,
      attributes: [
        {
          attribute: 'AGE',
          value: 'Edad',
          type: 'number',
        },
        {
          attribute: 'NATIONALITY',
          value: 'Nacionalidad',
          type: 'string',
        },
        {
          attribute: 'NATIONAL_MATRICULATION',
          value: 'Matrícula Nacional',
          type: 'string',
        },
        {
          attribute: 'PROVINCIAL_MATRICULATION',
          value: 'Matrícula Provincial',
          type: 'string',
        },
        {
          attribute: 'SPECIALTY',
          value: 'Especialidad',
          type: 'typed',
        },
      ],
    },
    {
      entity: 'INSTITUTION',
      value: 'Institución',
      quantificable: false,
      attributes: [
        {
          attribute: 'DESCRIPTION',
          value: 'Description',
          type: 'string',
        },
      ],
    },
    {
      entity: 'PHARMACIST',
      value: 'Farmacéutico',
      quantificable: true,
      attributes: [
        {
          attribute: 'AGE',
          value: 'Edad',
          type: 'number',
        },
        {
          attribute: 'NATIONALITY',
          value: 'Nacionalidad',
          type: 'string',
        },
        {
          attribute: 'MATRICULATION',
          value: 'Matrícula',
          type: 'string',
        },
      ],
    },
  ],
  operators: [
    {
      operator: 'EQUAL',
      value: 'Igual',
      symbol: '==',
      type: 'binary',
      argumentName: 'expectedValue',
      argumentType: 'single',
    },
    {
      operator: 'DISTINCT',
      value: 'Distinto',
      symbol: '!=',
      type: 'binary',
      argumentName: 'expectedValue',
      argumentType: 'single',
    },
    {
      operator: 'GREATER',
      value: 'Mayor',
      symbol: '>',
      type: 'binary',
      argumentName: 'expectedValue',
      argumentType: 'single',
    },
    {
      operator: 'LESSER',
      value: 'Menor',
      symbol: '<',
      type: 'binary',
      argumentName: 'expectedValue',
      argumentType: 'single',
    },
    {
      operator: 'GREATER_OR_EQUAL',
      value: 'Mayor o Igual',
      symbol: '>=',
      type: 'binary',
      argumentName: 'expectedValue',
      argumentType: 'single',
    },
    {
      operator: 'LESSER_OR_EQUAL',
      value: 'Menor o Igual',
      symbol: '<=',
      type: 'binary',
      argumentName: 'expectedValue',
      argumentType: 'single',
    },
    {
      operator: 'IN',
      value: 'En',
      symbol: 'En',
      type: 'binary',
      argumentName: 'posibleValues',
      argumentType: 'list',
    },
    {
      operator: 'CONTAINS',
      value: 'Contiene',
      symbol: 'Contiene',
      type: 'binary',
      argumentName: 'containedValue',
      argumentType: 'single',
    },
    {
      operator: 'IS_NULL',
      value: 'Es Nulo',
      symbol: 'Es Nulo',
      type: 'unary',
    },
    {
      operator: 'IS_NOT_NULL',
      value: 'No es Nulo',
      symbol: 'No es Nulo',
      type: 'unary',
    },
  ],
  operatorsByType: {
    boolean: [
      {
        operator: 'EQUAL',
      },
      {
        operator: 'DISTINCT',
      },
    ],
    code: [
      {
        operator: 'EQUAL',
      },
      {
        operator: 'DISTINCT',
      },
    ],
    number: [
      {
        operator: 'EQUAL',
      },
      {
        operator: 'GREATER',
      },
      {
        operator: 'LESSER',
      },
      {
        operator: 'GREATER_OR_EQUAL',
      },
      {
        operator: 'LESSER_OR_EQUAL',
      },
      {
        operator: 'DISTINCT',
      },
      {
        operator: 'IN',
      },
    ],
    string: [
      {
        operator: 'EQUAL',
      },
      {
        operator: 'DISTINCT',
      },
      {
        operator: 'IN',
      },
      {
        operator: 'CONTAINS',
      },
      {
        operator: 'IS_NULL',
      },
      {
        operator: 'IS_NOT_NULL',
      },
    ],
  },
  quantifiers: [
    {
      quantifier: 'EXISTS_AT_LEAST',
      value: 'Existe al Menos',
      symbol: '∃',
      type: 'binary',
      argumentName: 'quantity',
      argumentType: 'single',
    },
    {
      quantifier: 'EXISTS_EXACTLY',
      value: 'Existe Exactamente',
      symbol: '∃!',
      type: 'binary',
      argumentName: 'quantity',
      argumentType: 'single',
    },
    {
      quantifier: 'EXISTS_AT_MOST',
      value: 'Existe como Mucho',
      symbol: '∃>',
      type: 'binary',
      argumentName: 'quantity',
      argumentType: 'single',
    },
    {
      quantifier: 'FOR_ALL',
      value: 'Para Todo',
      symbol: '∀',
      type: 'unary',
    },
  ],
};
