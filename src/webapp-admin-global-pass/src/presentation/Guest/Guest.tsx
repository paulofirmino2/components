import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filter } from 'lodash';

import { Button, ContentHeader, Input, Table, Typography } from '@/components';
import { Card } from '@/components/Card';
import { getAllGuests } from '@/flux/modules/guest/actions';
import { Guest } from '@/flux/modules/guest/types';
import { useAllGuests } from '@/hook/selectors/guestHooks';
import { useAppDispatch } from '@/hook/store';
import { RequestStatus } from '@/models/iRequest';
import { emptyMask } from '@/utils/functions';

import { createColumns } from './createColumns';

export const GuestPresentation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status: statusGuest, data: dataGuest } = useAllGuests();

  const [search, setSearch] = useState<string>('');
  const [showCpf, setShowCpf] = useState<boolean>(false);

  const [dataTableFiltered, setDataTableFiltered] = useState<Guest[]>([]);

  useEffect(() => {
    dispatch(getAllGuests.request());
  }, []);

  useEffect(() => {
    if (statusGuest === RequestStatus.success) {
      if (dataGuest) {
        setDataTableFiltered(dataGuest);

        if (search) {
          setShowCpf(true);
        }
      }
    }
  }, [statusGuest, dataGuest]);

  const handleRedirect = () => {
    navigate('/convite/adicionar');
  };

  const handleShowDetails = (id: string) => {
    navigate(`/convite/detalhe/${id}`);
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setShowCpf(false);
    if (event.target.value.length === 14 && dataGuest) {
      const guestFiltered = filter(
        dataGuest,
        guestItem => guestItem.username === emptyMask(event.target.value)
      );

      if (guestFiltered.length > 0) {
        setDataTableFiltered(guestFiltered);
        setShowCpf(true);
      }
    } else if (event.target.value === '' && dataGuest) {
      setDataTableFiltered(dataGuest);
    }
    setSearch(event.target.value);
  };

  return (
    <>
      <Typography variant="title" spacing="lg">
        Gerenciamento de convite
      </Typography>
      <Card>
        <ContentHeader>
          <Input
            sizevariant="sm"
            placeholder="Digite cpf do convidado"
            iconleft="search"
            mask="cpf"
            onChange={handleChangeSearch}
            value={search}
          />
          <Button type="button" sizevariant="sm" onClick={handleRedirect}>
            Novo Cadastro
          </Button>
        </ContentHeader>
        <Table
          dataTable={dataTableFiltered}
          loading={statusGuest === RequestStatus.fetching}
          columns={createColumns({
            showCpf,
            onShowDetails: handleShowDetails,
          })}
        />
      </Card>
    </>
  );
};
