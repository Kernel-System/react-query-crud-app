import Loader from 'react-loader-spinner'
import { useMutation, useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Flex, Heading } from 'rebass/styled-components'
import { getBook, updateBook } from '../../api'
import BookForm from '../shared/BookForm'
import Container from '../shared/Container'

const UpdateBook = () => {
  const { id } = useParams()
  const history = useHistory()
  const { data, error, isLoading, isError } = useQuery(
    ['book', { id }],
    getBook
  )
  const { mutateAsync, isLoading: isMutating } = useMutation(updateBook)

  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data, id })
    history.push('/')
  }

  if (isLoading) {
    return (
      <Container>
        <Flex py={5} justifyContent='center'>
          <Loader type='ThreeDots' color='#ccc' height={30} />
        </Flex>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container>
        <Flex py={5} justifyContent='center'>
          Error: {error.message}
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Box py={3}>
        <Heading mb={3}>Update Book</Heading>
        <BookForm
          defaultValues={data}
          onFormSubmit={onFormSubmit}
          isLoading={isMutating}
        />
      </Box>
    </Container>
  )
}

export default UpdateBook
