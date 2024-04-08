import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationItem {
  href: string;
  number: number;
  isActive: boolean;
}

interface PaginationProps {
  items: PaginationItem[];
}
const Pagination = ({ items }: PaginationProps) => {
  return (
    <PaginationWrapper className="w-full md:w-fit">
      <PaginationContent>
        {items.map(() => {
          return (
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
};

export default Pagination;
