import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import { searchHandler } from '../handlers/searchHandler.js';
import { goalIncreaseHandler, getGoalProgressHandler, updateGoalHandler } from '../handlers/goalHandler.js';
import { 
  getAllCompaniesHandler, 
  searchCompaniesHandler, 
  getCompanyByDomainHandler, 
  getDataStatsHandler 
} from '../handlers/sustainabilityHandler.js';

const routes: FastifyPluginAsync = async (server: any) => {
    // Search endpoint
    server.get('/search', {
        schema: {
            querystring: Type.Object({
                q: Type.String(),
                count: Type.Optional(Type.Number({ minimum: 1, maximum: 50 })),
            }),
            response: {
                200: Type.Object({
                    results: Type.Array(Type.Object({
                        title: Type.String(),
                        url: Type.String(),
                        snippet: Type.String(),
                        displayUrl: Type.String(),
                    })),
                    totalResults: Type.Number(),
                    searchTime: Type.Number(),
                    query: Type.String(),
                    goalProgress: Type.Optional(Type.Array(Type.Object({
                        id: Type.String(),
                        type: Type.String(),
                        current: Type.Number(),
                        target: Type.Number(),
                        description: Type.String(),
                    }))),
                }),
            },
        },
    }, searchHandler);

    // Goal increase endpoint (for search actions)
    server.post('/goal/increase', {
        schema: {
            body: Type.Object({
                goalId: Type.String(),
                query: Type.String(),
                amount: Type.Optional(Type.Number({ minimum: 1 })),
            }),
            response: {
                200: Type.Object({
                    success: Type.Boolean(),
                    message: Type.String(),
                    goal: Type.Object({
                        id: Type.String(),
                        type: Type.String(),
                        current: Type.Number(),
                        target: Type.Number(),
                        description: Type.String(),
                    }),
                    query: Type.String(),
                }),
            },
        },
    }, goalIncreaseHandler);

    // Get goal progress endpoint
    server.get('/goalProgress', {
        schema: {
            response: {
                200: Type.Object({
                    goals: Type.Array(Type.Object({
                        id: Type.String(),
                        type: Type.String(),
                        current: Type.Number(),
                        target: Type.Number(),
                        description: Type.String(),
                    })),
                    totalGoals: Type.Number(),
                }),
            },
        },
    }, getGoalProgressHandler);

    // PUT endpoint for manual goal updates
    server.put('/updateGoal', {
        schema: {
            body: Type.Object({
                goalId: Type.String(),
                progress: Type.Number(),
            }),
            response: {
                200: Type.Object({
                    success: Type.Boolean(),
                    message: Type.String(),
                    goal: Type.Object({
                        id: Type.String(),
                        type: Type.String(),
                        current: Type.Number(),
                        target: Type.Number(),
                        description: Type.String(),
                    }),
                }),
            },
        },
    }, updateGoalHandler);

    // Sustainability API endpoints
    server.get('/api/companies', {
        schema: {
            querystring: Type.Object({
                limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
                offset: Type.Optional(Type.Number({ minimum: 0 })),
            }),
            response: {
                200: Type.Object({
                    data: Type.Array(Type.Object({
                        id: Type.Optional(Type.Number()),
                        domain: Type.String(),
                        company: Type.String(),
                        parent: Type.Optional(Type.String()),
                        sector: Type.String(),
                        hq_city: Type.String(),
                        carbon_neutral: Type.Boolean(),
                        sbti_status: Type.Optional(Type.String()),
                        renewable_energy_target_year: Type.Optional(Type.Number()),
                        renewable_share_percent: Type.Optional(Type.Number()),
                        scope_disclosure: Type.Object({
                            "1": Type.Boolean(),
                            "2": Type.Boolean(),
                            "3": Type.Boolean(),
                        }),
                        iso_certifications: Type.Array(Type.String()),
                        green_score: Type.Optional(Type.Number()),
                        controversies_count_12mo: Type.Optional(Type.Number()),
                        esg_policy_url: Type.Optional(Type.String()),
                        data_confidence: Type.Optional(Type.String()),
                    })),
                    total: Type.Number(),
                    offset: Type.Number(),
                    limit: Type.Number(),
                }),
            },
        },
    }, getAllCompaniesHandler);

    server.get('/api/companies/search', {
        schema: {
            querystring: Type.Object({
                domain: Type.Optional(Type.String()),
                company: Type.Optional(Type.String()),
            }),
            response: {
                200: Type.Object({
                    data: Type.Array(Type.Object({
                        id: Type.Optional(Type.Number()),
                        domain: Type.String(),
                        company: Type.String(),
                        parent: Type.Optional(Type.String()),
                        sector: Type.String(),
                        hq_city: Type.String(),
                        carbon_neutral: Type.Boolean(),
                        sbti_status: Type.Optional(Type.String()),
                        renewable_energy_target_year: Type.Optional(Type.Number()),
                        renewable_share_percent: Type.Optional(Type.Number()),
                        scope_disclosure: Type.Object({
                            "1": Type.Boolean(),
                            "2": Type.Boolean(),
                            "3": Type.Boolean(),
                        }),
                        iso_certifications: Type.Array(Type.String()),
                        green_score: Type.Optional(Type.Number()),
                        controversies_count_12mo: Type.Optional(Type.Number()),
                        esg_policy_url: Type.Optional(Type.String()),
                        data_confidence: Type.Optional(Type.String()),
                    })),
                    found: Type.Boolean(),
                    query: Type.Object({
                        domain: Type.Optional(Type.String()),
                        company: Type.Optional(Type.String()),
                    }),
                }),
            },
        },
    }, searchCompaniesHandler);

    server.get('/api/companies/domain/:domain', {
        schema: {
            params: Type.Object({
                domain: Type.String(),
            }),
            response: {
                200: Type.Object({
                    data: Type.Object({
                        id: Type.Optional(Type.Number()),
                        domain: Type.String(),
                        company: Type.String(),
                        parent: Type.Optional(Type.String()),
                        sector: Type.String(),
                        hq_city: Type.String(),
                        carbon_neutral: Type.Boolean(),
                        sbti_status: Type.Optional(Type.String()),
                        renewable_energy_target_year: Type.Optional(Type.Number()),
                        renewable_share_percent: Type.Optional(Type.Number()),
                        scope_disclosure: Type.Object({
                            "1": Type.Boolean(),
                            "2": Type.Boolean(),
                            "3": Type.Boolean(),
                        }),
                        iso_certifications: Type.Array(Type.String()),
                        green_score: Type.Optional(Type.Number()),
                        controversies_count_12mo: Type.Optional(Type.Number()),
                        esg_policy_url: Type.Optional(Type.String()),
                        data_confidence: Type.Optional(Type.String()),
                    }),
                    found: Type.Boolean(),
                    domain: Type.String(),
                }),
                404: Type.Object({
                    error: Type.String(),
                    domain: Type.String(),
                }),
            },
        },
    }, getCompanyByDomainHandler);

    server.get('/api/data/version', {
        schema: {
            response: {
                200: Type.Object({
                    version: Type.String(),
                    recordCount: Type.Number(),
                    lastUpdated: Type.String(),
                    categories: Type.Object({
                        carbonNeutral: Type.Number(),
                        withRenewableData: Type.Number(),
                        independentCompanies: Type.Number(),
                    }),
                }),
            },
        },
    }, getDataStatsHandler);
};

export default routes;
