import { Dispatch, SetStateAction } from 'react';

import { Avatar, Button, Dialog } from '@/components';
import { EmployeeWrapper, Tag } from '@/components/Table/UtilsComponents';
import { EmployeesSearch } from '@/flux/modules/employee/types';

import * as Styled from './Employee.styled';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employeeSelectedForDeleted: EmployeesSearch;
  setEmployeeSelectedForDeleted: Dispatch<
    SetStateAction<EmployeesSearch | null>
  >;
  onDelete: () => void;
};

export const EmployeeDialog = ({
  open,
  setOpen,
  employeeSelectedForDeleted,
  setEmployeeSelectedForDeleted,
  onDelete,
}: Props) => (
  <Dialog title="Você deseja excluir o usuário?" open={open} setOpen={setOpen}>
    <Styled.DialogContent>
      <p>
        Essa ação não poderá ser desfeita. Você precisará recadastrar o usuário
        caso deseje liberar o acesso novamente.
      </p>
      {employeeSelectedForDeleted && (
        <Styled.BoxEmployee>
          <Tag
            variant={employeeSelectedForDeleted.blocked ? 'block' : 'active'}
          >
            {employeeSelectedForDeleted.blocked ? 'Bloqueado' : 'Ativo'}
          </Tag>
          <EmployeeWrapper style={{ marginLeft: 24 }}>
            <Avatar
              src={employeeSelectedForDeleted.user.photo}
              name={employeeSelectedForDeleted.user.extra_data.name}
            />
            <span id="name">
              {employeeSelectedForDeleted.user.extra_data.name}
            </span>
          </EmployeeWrapper>
        </Styled.BoxEmployee>
      )}
      <Styled.DialogActionWrapper>
        <Button sizevariant="sm" onClick={onDelete}>
          Confirmar
        </Button>
        <Button
          id="btn-back"
          variant="secondary"
          sizevariant="sm"
          onClick={() => {
            setOpen(false);
            setEmployeeSelectedForDeleted(null);
          }}
        >
          Voltar
        </Button>
      </Styled.DialogActionWrapper>
    </Styled.DialogContent>
  </Dialog>
);
