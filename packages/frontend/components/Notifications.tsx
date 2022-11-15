import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react'

type TransactionTitles = {
  transactionStarted: string
  transactionSucceed: string
}

// Title text for the various transaction notifications.
const TRANSACTION_TITLES: TransactionTitles = {
  transactionStarted: 'Local Transaction Started',
  transactionSucceed: 'Local Transaction Completed',
}

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(4, length), '...')
}

type Notification = {
  id: string
  type: string
  transaction?: {
    hash: string
  }
}

type Props = {
  notifications: Notification[]
}

/**
 * Component
 */
function Notifications({ notifications = [] }: Props): JSX.Element {
  return (
    <>
      {notifications.map(({ id, type, transaction }: Notification) => {
        if (type === 'walletConnected') {
          return null
        }
        return (
          <Alert
            key={id}
            status="success"
            position="fixed"
            bottom="8"
            right="8"
            width="400px"
          >
            <AlertIcon />
            <Box>
              <AlertTitle>
                {TRANSACTION_TITLES[type as keyof TransactionTitles]}
              </AlertTitle>
              {transaction && (
                <AlertDescription overflow="hidden">
                  Transaction Hash: {truncateHash(transaction.hash, 61)}
                </AlertDescription>
              )}
            </Box>
          </Alert>
        )
      })}
    </>
  )
}

export default Notifications
