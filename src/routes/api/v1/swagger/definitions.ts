export default {
	SuccessResponse: {
		type: 'object',
		properties: {
			success: { type: 'boolean' },
		},
	},
	DefaultResponse: {
		type: 'object',
		properties: {
			success: { type: 'boolean' },
			data: { type: 'object' }
		},
	},
	ListResponse: {
		type: 'object',
		properties: {
			success: { type: 'boolean' },
			data: {
				type: 'object',
				properties: {
					data: {
						type: 'array',
						items: { type: 'object' },
					},
				}
			},
		}
	},
};