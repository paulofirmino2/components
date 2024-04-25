import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filter } from 'lodash';

import { Button, ContentHeader, Input, Table, Typography } from '@/components';
import { Card } from '@/components/Card';
import { myCompanies } from '@/flux/modules/company/actions';
import { Company as CompanyType } from '@/flux/modules/company/types';
import { useMyCompanies } from '@/hook/selectors/companyHooks';
import { useAppDispatch } from '@/hook/store';
import { RequestStatus } from '@/models/iRequest';

import { createColumns } from './createColumns';

export const CompanyPresentation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status: statusMyCompanies, data: dataMyCompanies } = useMyCompanies();

  const [search, setSearch] = useState<string>('');
  const [showCpf, setShowCpf] = useState<boolean>(false);

  const [dataTableFiltered, setDataTableFiltered] = useState<CompanyType[]>([]);

  useEffect(() => {
    dispatch(myCompanies.request());
  }, []);

  useEffect(() => {
    if (statusMyCompanies === RequestStatus.success) {
      if (dataMyCompanies) {
        setDataTableFiltered(dataMyCompanies);

        if (search) {
          setShowCpf(true);
        }
      }
    }
  }, [statusMyCompanies, dataMyCompanies]);

  const handleEdit = (id: string) => {
    navigate(`/empresa/editar/${id}`);
  };

  const handleRedirect = () => {
    navigate('/empresa/adicionar');
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setShowCpf(false);
    if (event.target.value.length && dataMyCompanies) {
      const dataCompaniesFiltered = filter(dataMyCompanies, companyItem =>
        companyItem.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );

      if (dataCompaniesFiltered.length > 0) {
        setDataTableFiltered(dataCompaniesFiltered);
        setShowCpf(true);
      }
    } else if (event.target.value === '' && dataMyCompanies) {
      setDataTableFiltered(dataMyCompanies);
    }
    setSearch(event.target.value);
  };

  return (
    <>
      <Typography variant="title" spacing="lg">
        Gerenciamento de Empresas
      </Typography>
      <Card>
        <ContentHeader>
          <Input
            sizevariant="sm"
            placeholder="Digite o nome da empresa"
            iconleft="search"
            onChange={handleChangeSearch}
            value={search}
          />
          <Button type="button" sizevariant="sm" onClick={handleRedirect}>
            Novo Cadastro
          </Button>
        </ContentHeader>
        <Table
          dataTable={dataTableFiltered}
          loading={statusMyCompanies === RequestStatus.fetching}
          columns={createColumns({
            onEdit: handleEdit,
            showCpf,
          })}
        />
      </Card>
    </>
  );
};
