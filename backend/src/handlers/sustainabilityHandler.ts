import { FastifyReply, FastifyRequest } from 'fastify';
import { SustainabilityService } from '../services/sustainabilityService.js';

interface CompaniesQuery {
  limit?: number;
  offset?: number;
}

interface SearchQuery {
  domain?: string;
  company?: string;
}

interface DomainParams {
  domain: string;
}

export const getAllCompaniesHandler = async (
  request: FastifyRequest<{ Querystring: CompaniesQuery }>,
  reply: FastifyReply
) => {
  try {
    const { limit = 50, offset = 0 } = request.query;
    const service = new SustainabilityService(request.server.pg);
    
    const result = await service.getAllCompanies(limit, offset);
    
    return reply.code(200).send(result);
  } catch (error) {
    request.log.error(error, 'Error fetching companies');
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const searchCompaniesHandler = async (
  request: FastifyRequest<{ Querystring: SearchQuery }>,
  reply: FastifyReply
) => {
  try {
    const { domain, company } = request.query;
    
    if (!domain && !company) {
      return reply.code(400).send({ error: 'Domain or company parameter required' });
    }
    
    const service = new SustainabilityService(request.server.pg);
    const result = await service.searchCompanies(domain, company);
    
    return reply.code(200).send(result);
  } catch (error) {
    request.log.error(error, 'Error searching companies');
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const getCompanyByDomainHandler = async (
  request: FastifyRequest<{ Params: DomainParams }>,
  reply: FastifyReply
) => {
  try {
    const { domain } = request.params;
    const service = new SustainabilityService(request.server.pg);
    
    const company = await service.getCompanyByDomain(domain);
    
    if (!company) {
      return reply.code(404).send({ 
        error: 'Company not found for domain',
        domain: domain 
      });
    }
    
    return reply.code(200).send({
      data: company,
      found: true,
      domain: domain
    });
  } catch (error) {
    request.log.error(error, 'Error fetching company by domain');
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const getDataStatsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const service = new SustainabilityService(request.server.pg);
    const stats = await service.getDataStats();
    
    return reply.code(200).send(stats);
  } catch (error) {
    request.log.error(error, 'Error fetching data stats');
    return reply.code(500).send({ error: 'Internal server error' });
  }
};