export const ActionTypes = [
	{
		id: 'training',
		group: 'shooting',
		color: '#e51480'
	},
	{
		id: 'pers_training',
		group: 'shooting',
		color: '#c4116e'
	},
	{
		id: 'competition',
		group: 'shooting',
		color: '#950d54'
	},
	{
		id: 'hunting',
		group: 'shooting',
		color: '#7d0744'
	},
	{
		id: 'dry_training',
		group: 'no_shooting',
		color: '#f659ba'
	},
	{
		id: 'other',
		group: 'no_shooting',
		color: '#a5b8b6'
	},
	{
		id: 'cleanup',
		group: 'no_shooting',
		color: '#6e7374'
	},
	{
		id: 'tuning',
		group: 'parts',
		color: '#bbf158'
	},
	{
		id: 'spare_parts',
		group: 'parts',
		color: '#3ef855'
	},
	{
		id: 'repair',
		group: 'parts',
		color: '#3d9c4b'
	},
	{
		id: 'bullets',
		group: 'buy_and_sell',
		color: '#fa934e'
	},
	{
		id: 'purchase',
		group: 'buy_and_sell',
		color: '#f88570'
	},
	{
		id: 'selling',
		group: 'buy_and_sell',
		color: '#9b6df6'
	},
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
