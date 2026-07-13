{
    'name': 'Daily Motivation Popup',
    'version': '19.0.1.0.0',
    'category': 'Productivity',
    'summary': 'Show a daily motivational quote popup to users on login',
    'description': """
Daily Motivation Popup
=======================
- Shows a random motivational quote popup once per day per user after login.
- Admins can add/edit/delete quotes from Settings.
- "Don't show again today" option.
- Multi-user support, only depends on base.
""",
    'author': 'yagnorix Technologies!',
    'maintainer' : 'yagnorix Technologies!',
    'license': 'LGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/motivation_quote_views.xml',
        'views/motivation_menu.xml',
        'data/quote_data.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'daily_motivation_popup/static/src/css/motivation_popup.css',
            'daily_motivation_popup/static/src/js/motivation_popup.js',
        ],
    },
    'demo' : [],
    'qweb' : [],
    'images' : ['static/description/banner.png'],
    'installable': True,
    'application': True,
    'auto_install': False,
}
