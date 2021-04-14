export const ActionTypes = [
	{
		id: 'other',
		color: '#bababa'
	},
	{
		id: 'training',
		color: '#06acd0'
	},
	{
		id: 'dry_training',
		color: '#04c2c2'
	},
	{
		id: 'pers_training',
		color: '#2a59d4'
	},
	{
		id: 'competition',
		color: '#f52138'
	},
	{
		id: 'tuning',
		color: '#f158ef'
	},
	{
		id: 'spare_parts',
		color: '#3ef855'
	},
	{
		id: 'repair',
		color: '#3d9c4b'
	},
	{
		id: 'bullets',
		color: '#fa934e'
	},
	{
		id: 'purchase',
		color: '#f88570'
	},
	{
		id: 'selling',
		color: '#9b6df6'
	},
	{
		id: 'cleanup',
		color: '#cbc44c'
	}
];

const typeColors = {};
ActionTypes.forEach(type => {
	typeColors[type.id] = type.color;
});

export const getTypeColor = (type: string): string => {
	return typeColors[type] as string || typeColors['other'] as string;
};

export const ActionCurrencies = [
	{
		id: 'USD',
		sign: '$'
	}, {
		id: 'EUR',
		sign: '€'
	}, {
		id: 'UAH',
		sign: '₴'
	}, {
		id: 'PLN',
		sign: 'zł'
	}, {
		id: 'OTH',
		sign: '='
	}
];

const currencySigns = {};
ActionCurrencies.forEach(currency => {
	currencySigns[currency.id] = currency.sign;
});

export const getCurrencySign = (currency: string): string => {
	return currencySigns[currency] as string || currencySigns['OTH'] as string;
};
