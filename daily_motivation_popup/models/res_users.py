from odoo import api, fields, models
from datetime import date


class ResUsers(models.Model):
    _inherit = 'res.users'

    motivation_last_shown_date = fields.Date(string='Motivation Popup Last Shown')

    @api.model
    def check_show_motivation_popup(self):
        """Return True if popup should be shown to current user today."""
        user = self.env.user
        today = date.today()
        if user.motivation_last_shown_date == today:
            return False
        return True

    @api.model
    def mark_motivation_popup_shown(self):
        """Mark popup as shown today for current user."""
        self.env.user.sudo().write({
            'motivation_last_shown_date': date.today(),
        })
        return True
