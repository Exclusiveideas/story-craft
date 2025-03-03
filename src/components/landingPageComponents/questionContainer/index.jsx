import "./question.css";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Question = ({ question }) => {
  return (
    <div className="questionContainer">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p className="triggerTxt">{question?.question}</p>
          </AccordionTrigger>
          <AccordionContent>
            <p className="itemTxt">
              {question?.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Question;
