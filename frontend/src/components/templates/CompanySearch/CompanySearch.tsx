import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as S from './CompanySearch.styled';
import { searchCompanies, getCompanyByDomain } from 'src/helpers/api/companySearch';
import type { CompanySearchResult, CompanyDetail } from 'src/types/Company.type';

export function CompanySearch(): JSX.Element {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CompanySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);

      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await searchCompanies(searchQuery.trim());
      setResults(data);
    } catch {
      setError('Failed to search companies. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      performSearch(query);
    }, 400);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, performSearch]);

  const handleSelectCompany = async (domain: string) => {
    setDetailLoading(true);
    setError('');

    try {
      const detail = await getCompanyByDomain(domain);
      setSelectedCompany(detail);
    } catch {
      setError('Failed to load company details. Please try again.');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedCompany(null);
  };

  return (
    <S.Section>
      <S.Title>Look Up a Company</S.Title>
      <S.Subtitle>
        Search for any company to see its sustainability score, carbon neutrality status, and greener
        alternatives.
      </S.Subtitle>

      <S.SearchWrapper>
        <S.SearchInput
          type='text'
          placeholder='Search by company name or domain...'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedCompany(null);
          }}
        />
      </S.SearchWrapper>

      {loading && <S.Spinner>Searching...</S.Spinner>}

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      {selectedCompany && (
        <S.DetailOverlay>
          <S.DetailCard>
            <S.DetailHeader>
              <div>
                <S.DetailCompany>{selectedCompany.company}</S.DetailCompany>
                <S.DetailDomain>{selectedCompany.domain}</S.DetailDomain>
              </div>
              <S.CloseButton onClick={handleCloseDetail} aria-label='Close'>
                &times;
              </S.CloseButton>
            </S.DetailHeader>

            <S.BadgeRow>
              <S.CarbonBadge neutral={selectedCompany.carbon_neutral}>
                {selectedCompany.carbon_neutral ? 'Carbon Neutral' : 'Not Carbon Neutral'}
              </S.CarbonBadge>
            </S.BadgeRow>

            <S.RenewableBarWrapper>
              <S.RenewableBarFill percent={selectedCompany.renewable_share_percent} />
            </S.RenewableBarWrapper>
            <S.RenewableLabel>
              {selectedCompany.renewable_share_percent}% Renewable Energy
            </S.RenewableLabel>

            <S.DetailGrid>
              {selectedCompany.sector && (
                <S.DetailField>
                  <S.DetailLabel>Sector</S.DetailLabel>
                  <S.DetailValue>{selectedCompany.sector}</S.DetailValue>
                </S.DetailField>
              )}
              {selectedCompany.headquarters && (
                <S.DetailField>
                  <S.DetailLabel>Headquarters</S.DetailLabel>
                  <S.DetailValue>{selectedCompany.headquarters}</S.DetailValue>
                </S.DetailField>
              )}
              {selectedCompany.origin && (
                <S.DetailField>
                  <S.DetailLabel>Origin</S.DetailLabel>
                  <S.DetailValue>{selectedCompany.origin}</S.DetailValue>
                </S.DetailField>
              )}
              {selectedCompany.parent && (
                <S.DetailField>
                  <S.DetailLabel>Parent Company</S.DetailLabel>
                  <S.DetailValue>{selectedCompany.parent}</S.DetailValue>
                </S.DetailField>
              )}
              {selectedCompany.data_updated_date && (
                <S.DetailField>
                  <S.DetailLabel>Data Updated</S.DetailLabel>
                  <S.DetailValue>{selectedCompany.data_updated_date}</S.DetailValue>
                </S.DetailField>
              )}
            </S.DetailGrid>

            {selectedCompany.description && (
              <S.DetailDescription>{selectedCompany.description}</S.DetailDescription>
            )}

            {selectedCompany.carbon_neutral_alternatives && (
              <S.DetailAlternatives>
                <S.DetailAlternativesLabel>Greener Alternatives</S.DetailAlternativesLabel>
                <S.DetailAlternativesValue>
                  {selectedCompany.carbon_neutral_alternatives}
                </S.DetailAlternativesValue>
              </S.DetailAlternatives>
            )}
          </S.DetailCard>
        </S.DetailOverlay>
      )}

      {detailLoading && <S.Spinner>Loading company details...</S.Spinner>}

      {!loading && !selectedCompany && query.trim().length >= 2 && results.length === 0 && !error && (
        <S.NoResults>No companies found for &ldquo;{query}&rdquo;</S.NoResults>
      )}

      {!selectedCompany && results.length > 0 && (
        <S.ResultsList>
          {results.map((company) => (
            <S.ResultCard key={company.domain} onClick={() => handleSelectCompany(company.domain)}>
              <S.ResultCompany>{company.company}</S.ResultCompany>
              <S.ResultDomain>{company.domain}</S.ResultDomain>
              <S.BadgeRow>
                <S.CarbonBadge neutral={company.carbon_neutral}>
                  {company.carbon_neutral ? 'Carbon Neutral' : 'Not Carbon Neutral'}
                </S.CarbonBadge>
              </S.BadgeRow>
              <S.RenewableBarWrapper>
                <S.RenewableBarFill percent={company.renewable_share_percent} />
              </S.RenewableBarWrapper>
              <S.RenewableLabel>
                {company.renewable_share_percent}% Renewable
              </S.RenewableLabel>
            </S.ResultCard>
          ))}
        </S.ResultsList>
      )}
    </S.Section>
  );
}
