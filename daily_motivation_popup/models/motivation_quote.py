import random

from odoo import api, fields, models


class MotivationQuote(models.Model):
    _name = 'motivation.quote'
    _description = 'Daily Motivation Quote'
    _rec_name = 'text'

    text = fields.Text(string='Quote', required=True)
    author = fields.Char(string='Author')
    active = fields.Boolean(string='Active', default=True)

    @api.model
    def get_random_quote(self):
        quotes = self.search([('active', '=', True)])
        if not quotes:
            return False
        quote = random.choice(quotes)
        return {
            'id': quote.id,
            'text': quote.text,
            'author': quote.author or '',
        }
