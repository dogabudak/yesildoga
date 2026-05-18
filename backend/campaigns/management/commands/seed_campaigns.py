from django.core.management.base import BaseCommand
from campaigns.models import Campaign, Milestone, CampaignGoal


CAMPAIGNS = [
    {
        'slug': 'forest',
        'name': 'Forests',
        'tagline': 'Preserve and restore the green lungs of our planet through reforestation projects.',
        'description': (
            'Our flagship reforestation initiative targets the degraded highlands near '
            'Kapuzbaşı, Kayseri. Working with local forestry authorities and volunteers, '
            'we plan to plant 1,000 European beech (Fagus sylvatica) trees across a '
            'carefully surveyed site.\n\n'
            'Beech forests are among the most biodiverse temperate ecosystems in Europe and '
            'Turkey. Each mature beech tree absorbs roughly 12 kg of CO₂ per year and '
            'provides habitat for hundreds of species. By restoring this forest corridor we '
            'aim to reconnect fragmented habitats, reduce soil erosion, and create a lasting '
            'carbon sink for the region.'
        ),
        'accent_color': '#0C6100',
        'icon': '🌲',
        'location': 'Kapuzbaşı, Kayseri',
        'target_metric': '1,000 European beech trees',
        'budget': 'TBD',
        'timeline': 'Oct-Nov planting season',
        'goal_amount': 15000,
        'display_order': 1,
        'milestones': [
            {'title': 'Site survey', 'target_date': '2024 Q1', 'is_completed': True, 'order': 1},
            {'title': 'Soil testing', 'target_date': '2024 Q2', 'is_completed': True, 'order': 2},
            {'title': 'Nursery selection', 'target_date': '2024 Q3', 'is_completed': False, 'order': 3},
            {'title': 'Site preparation', 'target_date': '2024 Q4', 'is_completed': False, 'order': 4},
            {'title': 'Tree planting', 'target_date': '2025 Q4', 'is_completed': False, 'order': 5},
        ],
        'goals': [
            {'title': 'Plant 1,000 European beech trees', 'status': 'ACTIVE', 'target_amount': 15000, 'order': 1},
        ],
    },
    {
        'slug': 'seas',
        'name': 'Seas & Oceans',
        'tagline': 'Protect marine ecosystems and fight ocean pollution with cleanup initiatives.',
        'description': (
            'Rivers carry an estimated 80 % of ocean-bound plastic. Our marine project '
            'focuses on intercepting plastic waste in the Aksu Stream before it reaches the '
            'Mediterranean Sea near Antalya.\n\n'
            'We are evaluating passive interceptor technologies that use the natural flow of '
            'the stream to capture floating debris without harming aquatic life. The goal is '
            'to remove 50 tons of plastic per year while generating data on pollution '
            'patterns that can inform regional policy.'
        ),
        'accent_color': '#23cafd',
        'icon': '🌊',
        'location': 'Aksu Stream, Antalya',
        'target_metric': '50 tons plastic/year',
        'budget': '~$10,000',
        'timeline': '2025 deployment',
        'goal_amount': 10000,
        'display_order': 2,
        'milestones': [
            {'title': 'Location assessment', 'target_date': '2024 Q1', 'is_completed': True, 'order': 1},
            {'title': 'Technology research', 'target_date': '2024 Q2', 'is_completed': True, 'order': 2},
            {'title': 'Funding campaign', 'target_date': '2024 Q3', 'is_completed': False, 'order': 3},
            {'title': 'Equipment procurement', 'target_date': '2025 Q1', 'is_completed': False, 'order': 4},
            {'title': 'Interceptor deployment', 'target_date': '2025 Q2', 'is_completed': False, 'order': 5},
        ],
        'goals': [
            {'title': 'Deploy river interceptor system', 'status': 'ACTIVE', 'target_amount': 10000, 'order': 1},
        ],
    },
    {
        'slug': 'agriculture',
        'name': 'Agriculture',
        'tagline': 'Support sustainable farming that feeds communities without harming the earth.',
        'description': (
            'Yucca gloriosa is a drought-resistant, low-maintenance plant with commercial '
            'potential in textiles, biofuel, and food supplements. Our agriculture campaign '
            'explores establishing a sustainable yucca farm in Turkey.\n\n'
            'The project will identify suitable arid or semi-arid land, source quality '
            'seedlings, and implement water-efficient irrigation. Revenue from yucca '
            'products will fund further sustainability initiatives, creating a self-sustaining '
            'cycle of environmental investment.'
        ),
        'accent_color': '#dabc0c',
        'icon': '🌾',
        'location': 'Turkey',
        'target_metric': 'Sustainable yucca farm',
        'budget': '$8,500',
        'timeline': '2025 growing season',
        'goal_amount': 8500,
        'display_order': 3,
        'milestones': [
            {'title': 'Species research', 'target_date': '2024 Q1', 'is_completed': True, 'order': 1},
            {'title': 'Land identification', 'target_date': '2024 Q2', 'is_completed': True, 'order': 2},
            {'title': 'Seedling procurement', 'target_date': '2024 Q4', 'is_completed': False, 'order': 3},
            {'title': 'Planting & irrigation', 'target_date': '2025 Q1', 'is_completed': False, 'order': 4},
            {'title': 'First harvest', 'target_date': '2025 Q4', 'is_completed': False, 'order': 5},
        ],
        'goals': [
            {'title': 'Establish sustainable yucca farm', 'status': 'ACTIVE', 'target_amount': 8500, 'order': 1},
        ],
    },
    {
        'slug': 'education',
        'name': 'Education',
        'tagline': 'Give every child a fair chance to learn, grow, and build a better future.',
        'description': (
            'In many small Turkish cities, children in outlying villages miss school simply '
            'because there is no affordable transport. Our education campaign aims to provide '
            'free school transport in a pilot city — starting with Yalova.\n\n'
            'We will conduct a needs assessment, design efficient routes, and procure '
            'vehicles to ensure every child can reach their school safely. The model is '
            'designed to be replicable so that, once proven, it can be rolled out to other '
            'underserved areas across Turkey.'
        ),
        'accent_color': '#0015fa',
        'icon': '📚',
        'location': 'Yalova, Turkey',
        'target_metric': 'Free school transport',
        'budget': 'TBD',
        'timeline': '2025-2026 school year',
        'goal_amount': 20000,
        'display_order': 4,
        'milestones': [
            {'title': 'Needs assessment', 'target_date': '2024 Q2', 'is_completed': True, 'order': 1},
            {'title': 'Pilot city selected', 'target_date': '2024 Q3', 'is_completed': True, 'order': 2},
            {'title': 'Route planning', 'target_date': '2025 Q1', 'is_completed': False, 'order': 3},
            {'title': 'Vehicle procurement', 'target_date': '2025 Q2', 'is_completed': False, 'order': 4},
            {'title': 'Service launch', 'target_date': '2025 Q3', 'is_completed': False, 'order': 5},
        ],
        'goals': [
            {'title': 'Provide free school transport in Yalova', 'status': 'ACTIVE', 'target_amount': 20000, 'order': 1},
        ],
    },
    {
        'slug': 'charity',
        'name': 'Charity',
        'tagline': 'Direct support for people and communities when they need it most.',
        'description': (
            'Our charity arm organises fundraising events — from concerts and art '
            'exhibitions to community dinners — that channel donations directly to '
            'environmental and social causes.\n\n'
            'By partnering with local artists and venues, we keep overhead low and '
            'maximize the impact of every ticket sold. Each event doubles as an awareness '
            'campaign, educating attendees about sustainability while raising funds for '
            'our projects.'
        ),
        'accent_color': '#6d836c',
        'icon': '💚',
        'location': 'Various',
        'target_metric': 'Fundraising events',
        'budget': '$7,000-$20,000',
        'timeline': 'Ongoing',
        'goal_amount': 12000,
        'display_order': 5,
        'milestones': [
            {'title': 'Event concept', 'target_date': '2024 Q1', 'is_completed': True, 'order': 1},
            {'title': 'Artist partnerships', 'target_date': '2024 Q2', 'is_completed': True, 'order': 2},
            {'title': 'Venue scouting', 'target_date': '2024 Q4', 'is_completed': False, 'order': 3},
            {'title': 'Ticket sales launch', 'target_date': '2025 Q1', 'is_completed': False, 'order': 4},
            {'title': 'First event', 'target_date': '2025 Q2', 'is_completed': False, 'order': 5},
        ],
        'goals': [
            {'title': 'Host fundraising events', 'status': 'ACTIVE', 'target_amount': 12000, 'order': 1},
        ],
    },
]


class Command(BaseCommand):
    help = 'Seed the database with initial campaign data'

    def handle(self, *args, **options):
        for data in CAMPAIGNS:
            milestones_data = data.pop('milestones')
            goals_data = data.pop('goals')

            campaign, created = Campaign.objects.update_or_create(
                slug=data['slug'],
                defaults=data,
            )
            action = 'Created' if created else 'Updated'
            self.stdout.write(f'{action} campaign: {campaign.name}')

            campaign.milestones.all().delete()
            for m in milestones_data:
                Milestone.objects.create(campaign=campaign, **m)

            campaign.goals.all().delete()
            for g in goals_data:
                CampaignGoal.objects.create(campaign=campaign, **g)

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(CAMPAIGNS)} campaigns'))
